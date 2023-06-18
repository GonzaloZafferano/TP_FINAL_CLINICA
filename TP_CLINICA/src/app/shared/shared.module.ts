import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { EspecialidadesPipe } from './pipes/especialidades.pipe';
import { EstadosPipe } from './pipes/estados.pipe';
import { FechaStringPipe } from './pipes/fecha-string.pipe';
import { TipoUsuarioPipe } from './pipes/tipo-usuario.pipe';
import { HeaderComponent } from './components/header/header.component';
import { TurnosPipe } from './pipes/turnos.pipe';
import { SortdiashorariosPipe } from './pipes/sortdiashorarios.pipe';
import { DuracionAtencionPipe } from './pipes/duracion-atencion.pipe';
import { EspecialistasPipe } from './pipes/especialistas.pipe';
import { SortBySecondsPipe } from './pipes/sort-by-seconds.pipe';
import { SortByNamePipe } from './pipes/sort-by-name.pipe';
import { SortByNameAndLastNamePipe } from './pipes/sort-by-name-and-last-name.pipe';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { UsuarioPipe } from './pipes/usuario.pipe';
import { HistoriaComponent } from './components/historia/historia.component';
import { DatosTurnoPipe } from './pipes/datos-turno.pipe';


@NgModule({
  declarations: [   
    LoaderComponent, EstadosPipe, EspecialidadesPipe, FechaStringPipe, 
    TipoUsuarioPipe, HeaderComponent, TurnosPipe, SortdiashorariosPipe, DuracionAtencionPipe, 
    EspecialistasPipe, SortBySecondsPipe, SortByNamePipe, 
    SortByNameAndLastNamePipe, BuscadorComponent, UsuarioPipe, HistoriaComponent, DatosTurnoPipe
  ],
  exports : [
    LoaderComponent, EstadosPipe, EspecialidadesPipe, FechaStringPipe, 
    TipoUsuarioPipe, HeaderComponent, TurnosPipe, SortdiashorariosPipe, DuracionAtencionPipe,
    EspecialistasPipe, SortBySecondsPipe, SortByNamePipe, 
    SortByNameAndLastNamePipe, BuscadorComponent, UsuarioPipe, HistoriaComponent
  ],
  imports: [
    CommonModule,    
  ],
})
export class SharedModule { }
