import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { SharedModule } from '../shared/shared.module';
import { CargarHorariosComponent } from './cargar-horarios/cargar-horarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    MiPerfilComponent,
    CargarHorariosComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    SharedModule,
    FormsModule,   
    ReactiveFormsModule, 
  ]
})
export class MiPerfilModule { }
