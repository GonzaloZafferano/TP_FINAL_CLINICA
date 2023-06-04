import { Component } from '@angular/core';
import { Acceso } from '../models/enums/acceso';
import { ToastService } from '../services/toast.service';
import { EspecialidadService } from '../services/especialidad.service';
import { FormatoService } from '../services/formato.service';
import { SolicitudesService } from '../services/solicitudes.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent {
  filaSeleccionada: any;
  listado: any[] = [];
  spinner: boolean = false;
  suscripcion: any;

  constructor(private solicitudService: SolicitudesService,
    private especialidadService: EspecialidadService,
    private formatoService: FormatoService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  async obtenerUsuarios() {
    this.spinner = true;

    if (this.suscripcion)
      this.suscripcion.unsubscribe();

    this.suscripcion = this.solicitudService.traerListaDeSolicitudesFiltradaConObservable('habilitado', Acceso.espera).subscribe(x => {
      this.spinner = true;
      this.listado = x;
      this.spinner = false;
    });
  }

  seleccionDeFila(itemSeleccionado: any) {
    this.filaSeleccionada = itemSeleccionado;
  }

  aceptar(usuario: any) {
    usuario.habilitado = Acceso.habilitado;    

    if (usuario.otroEspecialidad != '') {
      let otraEspecialidad = { id: v4(), nombre: this.formatoService.eliminarEspaciosYPasarAMin_May(usuario.otroEspecialidad) };
      this.especialidadService.cargarEspecialidadConIdAsignado(otraEspecialidad);
      usuario.especialidades.push(otraEspecialidad);
    }
    this.solicitudService.modificarSolicitud(usuario);
  }

  rechazar(usuario: any, motivoRechazo: any) {
    if (motivoRechazo && motivoRechazo.value.trim() != '') {
      usuario.mensajeEstado = motivoRechazo.value;
      usuario.habilitado = Acceso.rechazado;
      this.solicitudService.modificarSolicitud(usuario);
    }
    else {
      this.toastService.error('Debe detallar el motivo de rechazo.', 'Aviso.');
    }
  }
}