import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MisTurnosModule } from '../mis-turnos/mis-turnos.module';
import { DetalleshcComponent } from './detalleshc/detalleshc.component';

@NgModule({
  declarations: [
    PacientesComponent,
    DetalleshcComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedModule,
    MisTurnosModule,
    MatButtonModule //USAR PARA MAT MATERIAL
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] //USAR PARA MAT MATERIAL
})
export class PacientesModule { }
