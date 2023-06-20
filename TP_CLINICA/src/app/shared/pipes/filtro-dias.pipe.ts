import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDias'
})
export class FiltroDiasPipe implements PipeTransform {
  transform(array: any[]) {
    if (array && array instanceof Array && array.length > 0) {
      const turnosUnicosPorDia = array.filter((obj, index, self) => {
        return index === self.findIndex((o) => o.fechaString === obj.fechaString);
      });
      return turnosUnicosPorDia;
    }
    return array;
  }
}
