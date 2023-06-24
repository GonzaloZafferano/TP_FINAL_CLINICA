import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InformesComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule, SharedModule,
    FormsModule,   
    ReactiveFormsModule, 
  ]
})
export class InformesModule { }
