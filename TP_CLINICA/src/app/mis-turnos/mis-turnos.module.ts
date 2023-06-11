import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { SharedModule } from '../shared/shared.module';
import { TurnosComponent } from './turnos/turnos.component';
import { EncuestaComponent } from './encuesta/encuesta.component';


@NgModule({
  declarations: [
    MisTurnosComponent,
    TurnosPacienteComponent,
    TurnosEspecialistaComponent,
    TurnosComponent,
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    SharedModule
  ]
})
export class MisTurnosModule { }
