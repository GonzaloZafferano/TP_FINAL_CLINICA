import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnos'
})
export class TurnosPipe implements PipeTransform {

  transform(turno: any): string {
    let horaInicio = turno.horaInicio < 10 ? ('0' + turno.horaInicio) : turno.horaInicio;
    let horaFin = turno.horaFin < 10 ? ('0' + turno.horaFin) : turno.horaFin;
    return turno.dia + ' - ' + horaInicio + ':00 - ' + horaFin + ':00 - ' + turno.especialidad;
  }
}
