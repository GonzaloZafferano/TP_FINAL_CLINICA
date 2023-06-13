import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    RegistroComponent,
    RegistroUsuarioComponent,
    RegistroAdminComponent,
    RegistroEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,   
    ReactiveFormsModule,   
    SharedModule, 
    NgxCaptchaModule,
  ]
})
export class RegistroModule { }
