import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { SharedModule } from '../shared/shared.module';
import { TurnosComponent } from './turnos/turnos.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { CargarHistoriaComponent } from './cargar-historia/cargar-historia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MisTurnosComponent,
    TurnosPacienteComponent,
    TurnosEspecialistaComponent,
    TurnosComponent,
    EncuestaComponent,
    CargarHistoriaComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MisTurnosModule { }
