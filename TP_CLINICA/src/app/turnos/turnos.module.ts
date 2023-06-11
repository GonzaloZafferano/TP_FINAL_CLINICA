import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosComponent } from './turnos.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TurnosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    SharedModule
  ]
})
export class TurnosModule { }
