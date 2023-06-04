import { Pipe, PipeTransform } from '@angular/core';
import { FormatoService } from 'src/app/services/formato.service';

@Pipe({
  name: 'fechaString'
})
export class FechaStringPipe implements PipeTransform {
  constructor(private formato: FormatoService) { }

  transform(fecha: any): string {
    if (fecha) {

      let fecha2 = new Date(fecha.seconds * 1000);
      let fechaDate = fecha.toDate();
      return this.formato.fechaToString(fechaDate, false, false);
    }
    return '';
  }

}
