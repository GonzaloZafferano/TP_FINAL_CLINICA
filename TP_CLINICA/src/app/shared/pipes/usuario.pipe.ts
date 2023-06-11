import { Pipe, PipeTransform } from '@angular/core';
import { Perfil } from 'src/app/models/enums/perfil';

@Pipe({
  name: 'usuario'
})
export class UsuarioPipe implements PipeTransform {
  transform(usuario: any): string {
    return usuario.apellido + ' ' + usuario.nombre + ' - DNI:' + usuario.dni + ' - ' + Perfil[usuario.perfil];
  }
}
