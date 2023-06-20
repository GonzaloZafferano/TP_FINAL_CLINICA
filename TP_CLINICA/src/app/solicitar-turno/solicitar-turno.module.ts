import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from './solicitar-turno.component';
import { SharedModule } from '../shared/shared.module';
import { ListaTurnosComponent } from './lista-turnos/lista-turnos.component';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { DiasComponent } from './dias/dias.component';
import { HorasComponent } from './horas/horas.component';


@NgModule({
  declarations: [
    SolicitarTurnoComponent,
    ListaTurnosComponent,
    ListaEspecialistasComponent,
    DiasComponent,
    HorasComponent
  ],
  imports: [
    CommonModule,
    SolicitarTurnoRoutingModule,
    SharedModule
  ]
})
export class SolicitarTurnoModule { }
