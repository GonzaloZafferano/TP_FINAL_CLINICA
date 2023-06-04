import { Pipe, PipeTransform } from '@angular/core';
import { FormatoService } from 'src/app/services/formato.service';

@Pipe({
  name: 'fechaString'
})
export class FechaStringPipe implements PipeTransform {
  constructor(private formato: FormatoService) { }

  transform(fecha: any): string {
    if (fecha) {
      let fechaDate = fecha.toDate();
      return this.formato.fechaToString(fechaDate, false, false);
    }
    return '';
  }

}
