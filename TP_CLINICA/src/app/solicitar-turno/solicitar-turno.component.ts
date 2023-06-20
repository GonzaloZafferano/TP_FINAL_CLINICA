import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuarios.service';
import { EspecialidadService } from '../services/especialidad.service';
import { HorariosService } from '../services/horarios.service';
import { FirestoreService } from '../services/firestore.service';
import { ToastService } from '../services/toast.service';
import { SwalService } from '../services/swal.service';
import { UsuarioPipe } from '../shared/pipes/usuario.pipe';
import { SortByNameAndLastNamePipe } from '../shared/pipes/sort-by-name-and-last-name.pipe';
import { Perfil } from '../models/enums/perfil';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent {
  tituloBuscador: string = 'Ingrese Nombre | Apellido | Dni de paciente';
  filaSeleccionada: any;
  cargando: boolean = false;
  spinner: boolean = false;
  spinnerEspecialistas: boolean = false;
  spinnerTurnos: boolean = false;
  especialistas: any;
  especialidades: any;
  turnos: any;
  turnosPorDia: any;
  suscripcionEspecialidades: any;
  suscripcionEspecialistas: any;
  suscripcionUsuarios: any;
  suscripcionTurnos: any;
  especialidadSeleccionada: any;
  usuarioActual: any;
  pacienteSeleccionado: any = null;
  usuarioPipe: any;
  ordenarPorNombreYApellidoPipe: any;
  limpiarAutocomplete: boolean = false;
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
    this.eliminarSuscripcionUsuarios();
  }
  eliminarSuscripcionEspecialistas() {
    if (this.suscripcionEspecialistas)
      this.suscripcionEspecialistas.unsubscribe();
  }

  esAdmin() {
    return this.usuarioActual?.perfil == Perfil.administrador;
  }

  eliminarSuscripcionEspecialidades() {
    if (this.suscripcionEspecialidades)
      this.suscripcionEspecialidades.unsubscribe();
  }

  eliminarSuscripcionTurnos() {
    if (this.suscripcionTurnos)
      this.suscripcionTurnos.unsubscribe();
  }
  eliminarSuscripcionUsuarios() {
    if (this.suscripcionUsuarios)
      this.suscripcionUsuarios.unsubscribe();
  }

  ngOnDestroy() {
    this.eliminarSuscripciones();
  }

  ngOnInit() {
    this.cargando = true;
    this.usuarioPipe = new UsuarioPipe();
    this.ordenarPorNombreYApellidoPipe = new SortByNameAndLastNamePipe();

    this.traerEspecialidades();
    this.usuarioService.obtenerUsuarioActual().then(x => {
      this.usuarioActual = x;
    });

    this.cargando = false;
  }

  seleccionEspecialista(especialista: any) {
    this.spinnerTurnos = true;
    this.eliminarSuscripcionTurnos();
    this.suscripcionTurnos = this.horariosService.traerListaDeItemsFiltradoPor_TRES_CamposDe_IGUALDAD('idMedico', especialista.id, 'idEspecialidad', this.especialidadSeleccionada.id, 'ocupado', false).subscribe(x => {

      let hoy = new Date();
      let maximo = new Date();
      maximo.setDate(hoy.getDate() + 15);

      let turnosFiltradosPorFecha = x.filter((x: any) => {
        let fechaDate = new Date(x.fechaDate.seconds * 1000);
        if (fechaDate >= hoy && fechaDate <= maximo)
          return true;
        return false;
      })

      this.turnos = turnosFiltradosPorFecha;
      //this.turnosPorDia = turnosFiltradosPorFecha.filter(x => x.fechaString == turno.fechaString);
      this.spinnerTurnos = false;
      if (this.turnos.length == 0 && !this.cargando)
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
    if (this.esAdmin() && this.pacienteSeleccionado == null) {
      this.swalService.warning('Debe seleccionar un paciente para operar.', 'Aviso.');
    } else {
      this.filaSeleccionada = especialidad;
      this.especialistas = null;
      this.turnos = null;
      this.turnosPorDia = null;
      this.spinnerEspecialistas = true;
      this.especialidadSeleccionada = especialidad;
      this.eliminarSuscripcionTurnos();
      this.eliminarSuscripcionEspecialistas();
      this.suscripcionEspecialistas = this.usuarioService.obtenerListadoDeUsuariosObservable().subscribe(x => {
        let especialistas = x.filter(x => {
          if (x['especialidades']) {
            let especialidades = x['especialidades'].filter((x: any) => x.nombre == especialidad.nombre);
            return especialidades != null && especialidades.length > 0;
          }
          return false;
        });
        this.especialistas = especialistas;
        setTimeout(() => {
          if (this.especialistas.length == 0)
            this.toastService.informacion('La especialidad seleccionada NO CUENTA con especialistas por el momento.', 'Aviso.');
          this.spinnerEspecialistas = false;
        }, 700);
      });
    }
  }

  seleccionTurno(turno: any) {
    this.turnos = null;
    this.turnosPorDia = null;
    this.cargando = true;
    turno.ocupado = true;
    turno.estadoTurno = 'Solicitado';
    turno.fechaSolicitud = new Date().getTime();
    let paciente;

    if (this.esAdmin()) {
      paciente = this.pacienteSeleccionado;
    } else {
      paciente = this.usuarioActual;
    }

    turno.paciente = paciente;
    turno.idPaciente = paciente.id;
    turno.nombrePaciente = paciente.apellido + ' ' + paciente.nombre;

    this.horariosService.modificarItem(turno).then(x => {
      setTimeout(() => {
        this.swalService.exito('Turno cargado con exito!');
        this.cargando = false;
      }, 1000);
    });
  }

  //ACA ME TRAJE EL TURNO (DIA).
  //AHORA NECESITO TODOS LOS TURNOS (HORARIOS) DE ESE DIA.
  seleccionTurnoDia(turno: any, turnos: any[]) {
    if (turno) {
      this.turnosPorDia = turnos.filter(x => x.fechaString == turno.fechaString);
    }
  }

  ////////////////////-------------BUSCADOR----------------//////////////////////////////////////////
  //LO DECLARO DE ESTA FORMA PARA QUE EL COMPONENTE 
  //QUE LLAME A ESTA FUNCION PUEDA ACCEDER A LAS VARIABLES DE ESTE COMPONENTE
  buscarPaciente = async (dato: any) => {
    dato = dato.trim();
    let usuarios = await this.usuarioService.traerListaFiltradaPor_UN_Campo('perfil', 1);
    usuarios = usuarios.filter((x: any) => x?.nombre?.toLowerCase().includes(dato.toLowerCase()) || x?.apellido?.toLowerCase().includes(dato.toLowerCase()) || x?.dni?.toString().includes(dato));

    usuarios = this.ordenarPorNombreYApellidoPipe.transform(usuarios);

    return usuarios;
  }

  transformarTexto = (item: any) => {
    return this.usuarioPipe.transform(item);
  }

  limpiarDatos() {
    this.especialidadSeleccionada = null;
    this.especialistas = null;
    this.especialidades = null;
    this.turnos = null;
    this.pacienteSeleccionado = null;
    this.filaSeleccionada = null;
    this.limpiarAutocomplete = !this.limpiarAutocomplete;
    this.traerEspecialidades();
  }

  obtenerUsuario(usuario: any) {
    this.pacienteSeleccionado = usuario;
  }
  ////////////////////-------------FIN BUSCADOR----------------//////////////////////////////////////////

}
