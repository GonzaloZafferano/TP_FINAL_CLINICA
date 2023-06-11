import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Perfil } from '../models/enums/perfil';
import { UsuarioService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, private usuarioService: UsuarioService, private router: Router,) { }
  usuarioActual: any;
  cargandoUsuario: boolean = false;
  async ngOnInit() {
    await this.ontenerUsuarioActual();
  }
  
  async ontenerUsuarioActual() {
    this.cargandoUsuario = true;
    this.usuarioActual = await this.usuarioService.obtenerUsuarioActual();
    this.cargandoUsuario = false;
  }

  esAdmin() {
    return this.usuarioActual?.perfil == Perfil.administrador;
  }

  esEspecialista() {
    return this.usuarioActual?.perfil == Perfil.especialista;
  }

  esPaciente() {
    return this.usuarioActual?.perfil == Perfil.paciente;
  }
}
