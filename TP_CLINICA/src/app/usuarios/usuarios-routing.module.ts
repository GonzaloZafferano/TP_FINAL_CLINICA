import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoUsuariosComponent } from './listadoUsuarios/listado-usuarios/listado-usuarios.component';
import { ListaUsuariosEnEsperaComponent } from './listaUsuariosEnEspera/lista-usuarios-en-espera/lista-usuarios-en-espera.component';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
  {
    path: '', component: UsuariosComponent,
    children:
      [
        { path: '', component: ListadoUsuariosComponent },
        { path: 'usuarios-en-espera', component: ListaUsuariosEnEsperaComponent },
        { path: 'registro', loadChildren: () => import('../registro/registro.module').then(m => m.RegistroModule), },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
