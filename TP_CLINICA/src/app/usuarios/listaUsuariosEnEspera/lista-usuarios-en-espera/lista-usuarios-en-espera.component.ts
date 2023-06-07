import { Component } from '@angular/core';
import { Acceso } from 'src/app/models/enums/acceso';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { FormatoService } from 'src/app/services/formato.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ToastService } from 'src/app/services/toast.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-lista-usuarios-en-espera',
  templateUrl: './lista-usuarios-en-espera.component.html',
  styleUrls: ['./lista-usuarios-en-espera.component.css']
})
export class ListaUsuariosEnEsperaComponent {
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

  ngOnDestroy() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
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
