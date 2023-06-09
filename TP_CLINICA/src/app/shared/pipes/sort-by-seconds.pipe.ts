import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBySeconds'
})
export class SortBySecondsPipe implements PipeTransform {
  transform(array: any[],): any[] {
    if (!Array.isArray(array) || array.length === 0) {
      return array;
    }
    array.sort((a, b) => {
      if (a.fechaDate.seconds < b.fechaDate.seconds) {
        return -1;
      }
      else if (a.fechaDate.seconds > b.fechaDate.seconds) {
        return 1;
      }
      return 0;
    });
    return array;
  }

}
