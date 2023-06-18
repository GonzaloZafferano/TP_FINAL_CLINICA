import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBySeconds'
})
export class SortBySecondsPipe implements PipeTransform {
  transform(array: any[],esHc : boolean = false): any[] {    
    if (!Array.isArray(array) || array.length === 0) {
      return array;
    }
    if(!esHc){
      array.sort((a, b) => {
        if (a.fechaDate.seconds < b.fechaDate.seconds) {
          return -1;
        }
        else if (a.fechaDate.seconds > b.fechaDate.seconds) {
          return 1;
        }
        return 0;
      });
    }else{
      array.sort((a, b) => {
        if (a.fechaHc < b.fechaHc) {
          return -1;
        }
        else if (a.fechaHc > b.fechaHc) {
          return 1;
        }
        return 0;
      });
    }
    return array;
  }

}
