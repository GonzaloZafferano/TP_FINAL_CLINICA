import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './mis-turnos.component';
import { TurnosModule } from '../turnos/turnos.module';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { EncuestaComponent } from './encuesta/encuesta.component';

const routes: Routes = [
  { path: '', component: MisTurnosComponent },
  { path: 'turnos-paciente', component: TurnosPacienteComponent },
  { path: 'turnos-especialista', component: TurnosEspecialistaComponent },
  { path: 'encuesta', component: EncuestaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisTurnosRoutingModule { }
