import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { BienvenidoGuard } from './guards/bienvenido.guard';
import { LoginGuard } from './guards/login.guard';
import { RegistroGuard } from './guards/registro.guard';
import { UsuariosGuard } from './guards/usuarios.guard';
import { MisTurnosGuard } from './guards/mis-turnos.guard';
import { TurnosGuard } from './guards/turnos.guard';
import { MiPerfilGuard } from './guards/mi-perfil.guard';
import { SolicitarTurnoGuard } from './guards/solicitar-turno.guard';
import { PacientesGuardGuard } from './guards/pacientes-guard.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./bienvenido/bienvenido.module').then(m => m.BienvenidoModule), canActivate : [BienvenidoGuard] }, 
  { path: 'bienvenido', loadChildren: () => import('./bienvenido/bienvenido.module').then(m => m.BienvenidoModule), canActivate : [BienvenidoGuard] }, 
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate : [LoginGuard] }, 
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule), canActivate : [RegistroGuard] },
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate : [UsuariosGuard] },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate : [HomeGuard] },
  { path: 'mis-turnos', loadChildren: () => import('./mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule), canActivate : [MisTurnosGuard]  },
  { path: 'mi-perfil', loadChildren: () => import('./mi-perfil/mi-perfil.module').then(m => m.MiPerfilModule), canActivate : [MiPerfilGuard]  },
  { path: 'solicitar-turno', loadChildren: () => import('./solicitar-turno/solicitar-turno.module').then(m => m.SolicitarTurnoModule), canActivate : [SolicitarTurnoGuard]  },
  { path: 'turnos', loadChildren: () => import('./turnos/turnos.module').then(m => m.TurnosModule), canActivate : [TurnosGuard]  },
  { path: 'pacientes', loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule), canActivate : [PacientesGuardGuard] },
  { path: '**', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
