import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuarios.service';
import { EspecialidadService } from '../services/especialidad.service';
import { HorariosService } from '../services/horarios.service';
import { FirestoreService } from '../services/firestore.service';
import { ToastService } from '../services/toast.service';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent {

  cargando: boolean = false;
  spinner: boolean = false;
  spinnerEspecialistas: boolean = false;
  spinnerTurnos: boolean = false;
  especialistas: any;
  especialidades: any;
  turnos: any;
  suscripcionEspecialidades: any;
  suscripcionEspecialistas: any;
  suscripcionTurnos: any;
  especialidadSeleccionada: any;
  usuarioActual: any;

  constructor(
    private usuarioService: UsuarioService,
    private especialidadService: EspecialidadService,
    private swalService: SwalService,
    private toastService: ToastService,
    private horariosService: HorariosService,
  ) { }

  eliminarSuscripciones() {
    this.eliminarSuscripcionEspecialidades();
    this.eliminarSuscripcionEspecialistas();
    this.eliminarSuscripcionTurnos();
  }
  eliminarSuscripcionEspecialistas() {
    if (this.suscripcionEspecialistas)
      this.suscripcionEspecialistas.unsubscribe();
  }

  eliminarSuscripcionEspecialidades() {
    if (this.suscripcionEspecialidades)
      this.suscripcionEspecialidades.unsubscribe();
  }

  eliminarSuscripcionTurnos() {
    if (this.suscripcionTurnos)
      this.suscripcionTurnos.unsubscribe();
  }

  ngOnDestroy() {
    this.eliminarSuscripciones();
  }

  ngOnInit() {
    this.traerEspecialidades();
    this.usuarioService.obtenerUsuarioActual().then(x => {
      this.usuarioActual = x;
    });
  }

  seleccionEspecialista(especialista: any) {
    this.spinnerTurnos = true;
    this.eliminarSuscripcionTurnos();
    this.suscripcionTurnos = this.horariosService.traerListaDeItemsFiltradoPor_TRES_CamposDe_IGUALDAD('idMedico', especialista.id, 'idEspecialidad', this.especialidadSeleccionada.id, 'ocupado', false).subscribe(x => {
      this.turnos = x;
      this.spinnerTurnos = false;
      if (this.turnos.length == 0)
        this.toastService.informacion('El especialista seleccionado NO TIENE turnos disponibles para la especialidad seleccionada.', 'Aviso.');
    });
  }

  traerEspecialidades() {
    this.eliminarSuscripcionTurnos();
    this.spinner = true;
    this.suscripcionEspecialidades = this.especialidadService.obtenerListadoDeEspecialidadesObservable().subscribe((x: any) => {
      this.especialidades = x;
      this.spinner = false;
    });
  }

  seleccionEspecialidad(especialidad: any) {
    this.especialistas = null;
    this.turnos = null;
    this.spinnerEspecialistas = true;
    this.especialidadSeleccionada = especialidad;
    this.eliminarSuscripcionTurnos();
    this.suscripcionEspecialistas = this.usuarioService.obtenerEspecialistaPorEspecialidad(especialidad).subscribe(x => {
      this.especialistas = x;
      if (this.especialistas.length == 0)
        this.toastService.informacion('La especialidad seleccionada NO CUENTA con especialistas por el momento.', 'Aviso.');
      this.spinnerEspecialistas = false;
    });
  }

  seleccionTurno(turno: any) {
    this.eliminarSuscripcionTurnos();
    this.turnos = null;
    this.cargando = true;
    turno.ocupado = true;
    turno.idPaciente = this.usuarioActual.id;
    turno.nombrePaciente = this.usuarioActual.apellido + ' ' + this.usuarioActual.nombre;
    this.horariosService.modificarItem(turno).then(x => {
      setTimeout(() => {
        this.swalService.exito('Turno cargado con exito!');
        this.cargando = false;
      }, 1000);
    });
  }
}
