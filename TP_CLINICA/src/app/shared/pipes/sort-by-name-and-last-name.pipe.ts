import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByNameAndLastName'
})
export class SortByNameAndLastNamePipe implements PipeTransform {

  transform(array: any[],): any[] {
    if (!Array.isArray(array) || array.length === 0) {
      return array;
    }   
    return array.sort((a, b) => `${a.apellido} ${a.nombre}` .localeCompare(`${b.apellido} ${b.nombre}`));;
  }
}
