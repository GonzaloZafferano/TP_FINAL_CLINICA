import { Component } from "@angular/core";
import { Perfil } from "../models/enums/perfil";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuarios.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  ocultarBtnCuentaUsuario: boolean = false;
  ocultarBtnCuentaAdmin: boolean = false;
  ocultarBtnCuentaEspecialista: boolean = false;
  public ocultarLogo: boolean = false;

  constructor(private authService: AuthService, 
    private usuarioService : UsuarioService,
    private router: Router) {
  }

  ngOnInit() {
    let ruta = this.router.url;
    this.ocultarLogo = ruta != '/registro'  && ruta != '/usuarios/registro';
    this.ocultarBtnCuentaEspecialista = ruta.includes('registro/especialista');
    this.ocultarBtnCuentaUsuario = ruta.includes('registro/usuario');
    this.ocultarBtnCuentaAdmin = ruta.includes('registro/administrador');
  }
  esAdministrador() {
    let usuario = this.verificarEstadoDeUsuario();
    return usuario != null && usuario.perfil == Perfil.administrador;
  }

  usuarioEstaLogueado() {
    return this.usuarioService.getUsuarioEstaLogueado;
  }

  verificarEstadoDeUsuario() {
    return this.usuarioService.getUsuarioActualBasico;
  }

  /**
   * 
   * @param tipo 1 Cuenta Admin, 2 Cuenta Especialista, 3 Cuenta Usuario
   */
  cuenta(tipo: number) { 
    if (tipo == 1) {
      this.ocultarBtnCuentaAdmin = true;
      this.ocultarBtnCuentaUsuario = false;
      this.ocultarBtnCuentaEspecialista = false;
    }
    else if (tipo == 2) {
      this.ocultarBtnCuentaAdmin = false;
      this.ocultarBtnCuentaUsuario = false;
      this.ocultarBtnCuentaEspecialista = true;
    }
    else if (tipo == 3) {
      this.ocultarBtnCuentaAdmin = false;
      this.ocultarBtnCuentaUsuario = true;
      this.ocultarBtnCuentaEspecialista = false;
    }
    this.ocultarLogo = true;
  }
}
