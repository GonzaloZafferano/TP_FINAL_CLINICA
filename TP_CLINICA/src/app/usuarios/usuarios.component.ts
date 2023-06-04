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
  constructor(private solicitudService: SolicitudesService, 
    private authService: AuthService, private router: Router) { }

    cerrarSesion() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}