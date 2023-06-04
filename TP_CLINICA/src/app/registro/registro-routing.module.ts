import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';

const routes: Routes = [
  { 
  path: '', component: RegistroComponent,
  children: [ //Los que esten marcados como 'children' se cargaran en el <router-outlet></router-outlet> del que este como componente padre
  { path: 'usuario', component: RegistroUsuarioComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
  { path: 'administrador', component: RegistroAdminComponent }, //Este se cargara dentro del componente padre 'HomeComponent'
  { path: 'especialista', component: RegistroEspecialistaComponent }, //Este se cargara dentro del componente padre 'HomeComponent'


  
]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
