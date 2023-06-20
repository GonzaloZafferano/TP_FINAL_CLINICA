import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaFormato'
})
export class HoraFormatoPipe implements PipeTransform {

  transform(turno: any) {
    if (turno) {
      let fecha = new Date(turno.fechaDate.seconds * 1000);
      let hora = fecha.getHours();
      const minutos = fecha.getMinutes();
      const ampm = hora >= 12 ? 'pm' : 'am';

      // Convertir a formato de 12 horas
      hora %= 12;
      hora = hora || 12;

      // Agregar ceros iniciales si es necesario
      const formattedHours = hora < 10 ? `0${hora}` : `${hora}`;
      const formattedMinutes = minutos < 10 ? `0${minutos}` : `${minutos}`;

      return `${formattedHours}:${formattedMinutes}${ampm}`;
    }
    return '';
  }

}
