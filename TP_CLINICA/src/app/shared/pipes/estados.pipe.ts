import { Pipe, PipeTransform } from '@angular/core';
import { Acceso } from '../../models/enums/acceso';

@Pipe({
  name: 'estados'
})
export class EstadosPipe implements PipeTransform {
  transform(estado: Acceso): string {
    if (estado == Acceso.espera)
      return 'En espera';
    else if (estado == Acceso.habilitado)
      return 'Habilitado';
    else
      return 'Rechazado';
  }
}
