import { Pipe, PipeTransform } from '@angular/core';
import { Perfil } from 'src/app/models/enums/perfil';

@Pipe({
  name: 'tipoUsuario'
})
export class TipoUsuarioPipe implements PipeTransform {
  transform(perfil: any): string {
    if (perfil == Perfil.administrador)
      return 'Administrador';
    else if (perfil == Perfil.especialista)
      return 'Especialista';
    else if (perfil == Perfil.usuario)
      return 'Paciente';
    return '';
  }
}
