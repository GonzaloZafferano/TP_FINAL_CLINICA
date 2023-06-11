import { Component, Input } from '@angular/core';
import { Acceso } from 'src/app/models/enums/acceso';
import { Perfil } from 'src/app/models/enums/perfil';
import { AuthService } from 'src/app/services/auth.service';
import { FormatoService } from 'src/app/services/formato.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-detalles',
  templateUrl: './usuarios-detalles.component.html',
  styleUrls: ['./usuarios-detalles.component.css']
})
export class UsuariosDetallesComponent {
  @Input() spinner: boolean = false;
  @Input() anchoSpinner: any;
  @Input() usuario: any;

  constructor(private formateo: FormatoService,
    private authService: AuthService,
    private usuarioService: UsuarioService) { }

  obtenerUrlImagen(usuario: any) {
    if (usuario.perfil != Perfil.paciente)
      return usuario.imagen;
    return usuario.imagen1;
  }

  esUsuarioActual(usuario: any) {
    if (this.usuarioService.getUsuarioActualBasico)
      return this.usuarioService.getUsuarioActualBasico.id == usuario.id;
    else
      return true;
  }

  estaHabilitado(usuario: any) {
    return usuario.habilitado == Acceso.habilitado;
  }

  deshabilitar(usuario: any) {
    if (this.estaHabilitado(usuario)) {
      usuario.habilitado = Acceso.rechazado;
      this.usuarioService.modificarUsuario(usuario);
    }
  }

  habilitar(usuario: any) {
    if (!this.estaHabilitado(usuario)) {
      usuario.habilitado = Acceso.habilitado;
      this.usuarioService.modificarUsuario(usuario);
    }
  }
}
