import { Component } from '@angular/core';
import { UsuarioService } from './services/usuarios.service';
import { Usuario } from './models/class/usuario';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP_CLINICA';

  constructor(private usuarioService : UsuarioService, private authService : AuthService){}




  alta(){
    let usuario = new Usuario();
    usuario.apellido = 'apell';
    usuario.clave = 'passs';
    usuario.correo = 'correo';
    usuario.nombre = 'nombre';

this.usuarioService.cargarUsuarioSinIdAsignado(usuario);

this.authService.registrarUsuario('gonzalo@gon.com', '123456');

  }
}
