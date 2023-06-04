import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListadoUsuariosComponent } from './listadoUsuarios/listado-usuarios/listado-usuarios.component';
import { ListaUsuariosEnEsperaComponent } from './listaUsuariosEnEspera/lista-usuarios-en-espera/lista-usuarios-en-espera.component';
import { UsuariosDetallesComponent } from './usuariosDetalles/usuarios-detalles/usuarios-detalles.component';
import { UsuariosComponent } from './usuarios.component';

@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    ListaUsuariosEnEsperaComponent,
    UsuariosDetallesComponent, 
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule, 
    SharedModule   
  ]
})
export class UsuariosModule { }
