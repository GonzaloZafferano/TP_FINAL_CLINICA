import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Acceso } from 'src/app/models/enums/acceso';
import { Perfil } from 'src/app/models/enums/perfil';
import { FormatoService } from 'src/app/services/formato.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  ocultarBotonUsuarios: boolean = false;
  ocultarBotonUsuariosEnEspera: boolean = false;

  constructor(private solicitudService: SolicitudesService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.ocultarBotones();
  }

  cerrarSesion() {
    this.authService.logOut();
    this.router.navigate(['/login']);
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

    this.ocultarBotonUsuarios = rutaAEvaluar == '/usuarios';
    this.ocultarBotonUsuariosEnEspera = rutaAEvaluar.includes('/usuarios/usuarios-en-espera');
  }
}