import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByName'
})
export class SortByNamePipe implements PipeTransform {

  transform(array: any[],): any[] {
    if (!Array.isArray(array) || array.length === 0) {
      return array;
    }   
    return array.sort((a, b) => a.nombre.localeCompare(b.nombre));;
  }
}
