import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ocultarBotonHome: boolean = false;
  ocultarBotonMiPerfil: boolean = false;
  constructor(private usuarioService: UsuarioService, private router: Router,) { }

  async ngOnInit() {
    this.ocultarBotones();
  }

  get usuarioLogueado() {
    return this.usuarioService.usuarioEstaLogueado;
  }

  get usuarioActual() {
    return this.usuarioService.usuarioAuth;
  }

  get routerUrl() {
    return this.router.url;
  }

  ocultarBotones(home: boolean = false) {
    this.ocultarBotonHome = this.router.url == '/home';
    //this.ocultarBotonMiPerfil = this.router.url == '/mi-perfil';
    if (home)
      this.router.navigate(['/home']);
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesionUsuario();
  }

  miPerfil() {
    //this.ocultarBotonMiPerfil = this.router.url == '/mi-perfil';
    this.router.navigate(['mi-perfil']);
  }

  home() {
    this.router.navigate(['home']);
  }

  NavigationEnd() {

  }
}
