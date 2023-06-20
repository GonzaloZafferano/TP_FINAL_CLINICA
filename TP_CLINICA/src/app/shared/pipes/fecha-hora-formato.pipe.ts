import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaHoraFormato'
})
export class FechaHoraFormatoPipe implements PipeTransform {

  transform(turno: any) {
    if (turno) {
      let fecha = new Date(turno.fechaDate.seconds * 1000);

      let dia = fecha.getDate() > 9 ? fecha.getDate() : '0' + fecha.getDate();
      let mes = (fecha.getMonth() + 1) > 9 ? (fecha.getMonth() + 1) : '0' + (fecha.getMonth() + 1);
      return `${dia}/${mes}`;
    }
    return '';
  }

}
