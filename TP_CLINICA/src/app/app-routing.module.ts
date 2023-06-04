import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { BienvenidoGuard } from './guards/bienvenido.guard';
import { LoginGuard } from './guards/login.guard';
import { RegistroGuard } from './guards/registro.guard';
import { UsuariosGuard } from './guards/usuarios.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./bienvenido/bienvenido.module').then(m => m.BienvenidoModule), canActivate : [BienvenidoGuard] }, 
  { path: 'bienvenido', loadChildren: () => import('./bienvenido/bienvenido.module').then(m => m.BienvenidoModule), canActivate : [BienvenidoGuard] }, 
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate : [LoginGuard] }, 
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule), canActivate : [RegistroGuard] },
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate : [UsuariosGuard] },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate : [HomeGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
