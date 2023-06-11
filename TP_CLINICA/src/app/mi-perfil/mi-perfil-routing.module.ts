import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPerfilComponent } from './mi-perfil.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CargarHorariosComponent } from './cargar-horarios/cargar-horarios.component';
import { CargarTurnosGuard } from '../guards/cargar-turnos.guard';

const routes: Routes = [
  {
    path: '', component: MiPerfilComponent,
    children:
      [
        { path: '', component: PerfilComponent },
        { path: 'mis-horarios', component: CargarHorariosComponent, canActivate : [CargarTurnosGuard] },         
      ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiPerfilRoutingModule { }
