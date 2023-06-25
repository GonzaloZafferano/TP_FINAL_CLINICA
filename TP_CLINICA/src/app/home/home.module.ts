import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

//USAR PARA MAT MATERIAL
import { MatButtonModule } from '@angular/material/button';

/**
 * MAT:                                        ng add @angular/material
 * TENGO QUE IMPORTAR:                         schemas: [CUSTOM_ELEMENTS_SCHEMA]    En el modulo que lo vaya a USAR.
 * TAMBIEN, EN EL MODULO QUE LO VAYA A USAR:   import { MatButtonModule } from '@angular/material/button';
 * Y EN EL ARRAY DE IMPORTS:                   imports: [MatButtonModule]
 * EN ESTA MISMA PAGINA ESTA EL EJEMPLO DE TODO. Y EN EL HTML, UN EJEMPLO DEL BOTON.

 */


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatButtonModule //USAR PARA MAT MATERIAL
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] //USAR PARA MAT MATERIAL
})
export class HomeModule { }
