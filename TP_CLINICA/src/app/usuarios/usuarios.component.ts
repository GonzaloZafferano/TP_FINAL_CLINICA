import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Acceso } from 'src/app/models/enums/acceso';
import { Perfil } from 'src/app/models/enums/perfil';
import { FormatoService } from 'src/app/services/formato.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  ocultarBotonUsuarios: boolean = false;
  //ocultarBotonRegistro: boolean = false;
  ocultarBotonUsuariosEnEspera: boolean = false;
  filaSeleccionada: any;
  listado: any[] = [];
  usuariosEnEspera: number = -1;
  spinner: boolean = false;
  suscripcionEnEspera: any;
  usuario: any;
  cargando: boolean = true;

  constructor(private solicitudService: SolicitudesService,
    private localStorage: LocalstorageService,
    private usuarioService: UsuarioService,
    private toastService: ToastService,
    private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.obtenerUsuarioActual();
    this.ocultarBotones();
    this.obtenerUsuariosEnEspera();
  }

  async obtenerUsuarioActual() {
    this.cargando = true;
    this.usuario = await this.usuarioService.obtenerUsuarioActual();
    this.cargando = false;
  }

  ngOnDestroy() {
    if (this.suscripcionEnEspera)
      this.suscripcionEnEspera.unsubscribe();
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesionUsuario();
  }

  getUsuarioEnEspera() {
    return this.solicitudService.usuariosEnEspera;
  }

  ocultarBotones(ruta: string = '') {
    let rutaAEvaluar = ''
    if (ruta != '')
      rutaAEvaluar = ruta;
    else
      rutaAEvaluar = this.router.url;

    this.ocultarBotonUsuarios = rutaAEvaluar == '/usuarios' || rutaAEvaluar.includes('/registro');
    this.ocultarBotonUsuariosEnEspera = rutaAEvaluar.includes('/usuarios/usuarios-en-espera');
    //this.ocultarBotonRegistro = rutaAEvaluar.includes('/registro');
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
}