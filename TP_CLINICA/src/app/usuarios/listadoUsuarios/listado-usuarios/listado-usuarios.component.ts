import { Component } from '@angular/core';
import { Acceso } from 'src/app/models/enums/acceso';
import { Perfil } from 'src/app/models/enums/perfil';
import { FormatoService } from 'src/app/services/formato.service';
import { HcService } from 'src/app/services/hc.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent {
  filaSeleccionada: any;
  listado: any[] = [];
  spinner: boolean = false;
  suscripcion: any;
  suscripcionEnEspera: any;
  cargando: boolean = false;
  historiaClinica: any;
  mostrarHC: boolean = false;
  constructor(private usuarioService: UsuarioService, private historiaService: HcService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngOnDestroy() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();

    if (this.suscripcionEnEspera)
      this.suscripcionEnEspera.unsubscribe();
  }

  async obtenerUsuarios() {
    this.spinner = true;

    if (this.suscripcion)
      this.suscripcion.unsubscribe();

    this.suscripcion = this.usuarioService.obtenerListadoDeUsuariosObservable().subscribe(x => {
      this.spinner = true;
      this.listado = x;
      this.spinner = false;
    });
  }

  seleccionDeFila(itemSeleccionado: any) {
    this.filaSeleccionada = itemSeleccionado;
  }

  obtenerUrlImagen(usuario: any) {
    if (usuario.perfil != Perfil.paciente)
      return usuario.imagen;
    return usuario.imagen1;
  }

  cerrarHC() {
    this.cargando = false;
    this.mostrarHC = false;
  }

  async mostrarHistoria(item: any) {
    if (item.tieneHC) {
      this.cargando = true;
      let hc = await this.historiaService.traerListaFiltradaPor_UN_Campo('pacienteId', item.id);

      if (hc && hc.length > 0) {
        this.historiaClinica = hc[0];
        this.mostrarHC = true;
      } else {
        this.cerrarHC();
      }
    }
  }
}
