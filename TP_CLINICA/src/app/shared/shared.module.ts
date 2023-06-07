import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { EspecialidadesPipe } from './pipes/especialidades.pipe';
import { EstadosPipe } from './pipes/estados.pipe';
import { FechaStringPipe } from './pipes/fecha-string.pipe';
import { TipoUsuarioPipe } from './pipes/tipo-usuario.pipe';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [   
    LoaderComponent, EstadosPipe, EspecialidadesPipe, FechaStringPipe, TipoUsuarioPipe, HeaderComponent
  ],
  exports : [
    LoaderComponent, EstadosPipe, EspecialidadesPipe, FechaStringPipe, TipoUsuarioPipe, HeaderComponent
  ],
  imports: [
    CommonModule,    
  ],
})
export class SharedModule { }
