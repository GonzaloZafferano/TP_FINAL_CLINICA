import { Component } from '@angular/core';
import { Acceso } from 'src/app/models/enums/acceso';
import { Perfil } from 'src/app/models/enums/perfil';
import { FormatoService } from 'src/app/services/formato.service';
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
  usuariosEnEspera: number = -1;
  spinner: boolean = false;
  suscripcion: any;
  suscripcionEnEspera: any;

  constructor(private usuarioService: UsuarioService,
    private solicitudService: SolicitudesService,
    private formatoService: FormatoService,
    private toastService: ToastService) { }


  ngOnInit(): void {
    this.obtenerUsuariosEnEspera();
    this.obtenerUsuarios();
  }

  ngOnDestroy(){
    if (this.suscripcion)
    this.suscripcion.unsubscribe();

    if (this.suscripcionEnEspera)
    this.suscripcionEnEspera.unsubscribe();
  }

  async obtenerUsuariosEnEspera() {    
    this.spinner = true;

    if (this.suscripcionEnEspera)
      this.suscripcionEnEspera.unsubscribe();

    this.suscripcionEnEspera = this.solicitudService.traerListaDeSolicitudesFiltradaConObservable('habilitado', Acceso.espera).subscribe(x => {
      if (this.usuariosEnEspera == -1)
        this.usuariosEnEspera = x.length;
   
      if (this.usuariosEnEspera < x.length)
        this.toastService.informacion('Un nuevo usuario solicita habilitación', 'Aviso.', 3000);
      this.usuariosEnEspera = x.length;
      this.solicitudService.usuariosEnEspera = x.length;
    });
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
    if (usuario.perfil != Perfil.usuario)
      return usuario.imagen;
    return usuario.imagen1;
  }
}
