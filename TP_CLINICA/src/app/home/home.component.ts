import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Perfil } from '../models/enums/perfil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService, private router: Router,) { }

  cerrarSesion() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  esAdmin(){
    return this.authService.getUsuarioActualBasico && this.authService.getUsuarioActualBasico.perfil == Perfil.administrador;
  }
}