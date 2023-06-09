import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duracionAtencion'
})
export class DuracionAtencionPipe implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case 30:
        return '00:30';
      case 45:
        return '00:45';
      case 60:
        return '01:00';
      case 90:
        return '01:30';
      case 120:
        return '02:00';
      default:
        return '';
    }
  }

}
