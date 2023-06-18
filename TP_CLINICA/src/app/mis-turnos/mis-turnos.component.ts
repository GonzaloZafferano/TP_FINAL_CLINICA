import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuarios.service';
import { Perfil } from '../models/enums/perfil';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css'],
    animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MisTurnosComponent {
  usuarioActual: any;
  constructor(private usuarioService: UsuarioService) { }

  async ngOnInit() {
    this.usuarioActual = await this.usuarioService.obtenerUsuarioActual();
  }

  esPaciente() {
    return this.usuarioActual?.perfil == Perfil.paciente;
  }

  esEspecialista() {
    return this.usuarioActual?.perfil == Perfil.especialista;
  }

  esEsAdmin() {
    return this.usuarioActual?.perfil == Perfil.administrador;
  }
}
