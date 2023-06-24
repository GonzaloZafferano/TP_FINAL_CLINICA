import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { GraficoBarrasComponent } from './grafico-barras/grafico-barras.component';
import { GraficoTortaComponent } from './grafico-torta/grafico-torta.component';


@NgModule({
  declarations: [
    InformesComponent,
    GraficoBarrasComponent,
    GraficoTortaComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule, SharedModule,
    FormsModule,   
    ReactiveFormsModule, 
    NgChartsModule
  ]
})
export class InformesModule { }
