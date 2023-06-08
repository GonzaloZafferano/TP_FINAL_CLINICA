import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortdiashorarios'
})
export class SortdiashorariosPipe implements PipeTransform {
  transform(array: any[],): any[] {
    // Verificar si el array o la propiedad están vacíos
    if (!Array.isArray(array) || array.length === 0) {
      return array;
    }

    array.sort((a, b) => {
      if (a.diaN < b.diaN) {
        return -1;
      }
      else if (a.diaN > b.diaN) {
        return 1;
      } else {
        if (a.horaInicio < b.horaInicio)
          return -1;
        else if (a.horaInicio > b.horaInicio)
          return 1
      }
      return 0;
    });
    return array;
  }
}
