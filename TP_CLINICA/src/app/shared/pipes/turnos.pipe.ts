import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnos'
})
export class TurnosPipe implements PipeTransform {

  transform(turno: any, mostrarTurnosSegunEspecialista: boolean = true, mostrarEspecialidad : boolean = true): string {
    if (mostrarTurnosSegunEspecialista) {
      let horaInicio = turno.horaInicio < 10 ? ('0' + turno.horaInicio) : turno.horaInicio;
      let horaFin = turno.horaFin < 10 ? ('0' + turno.horaFin) : turno.horaFin;
      return turno.dia + ' - ' + horaInicio + ':00 - ' + horaFin + ':00 - ' + turno.especialidad;
    } else {
      let fechaDate = new Date(turno.fechaDate.seconds * 1000);
      let horaInicio = fechaDate.getHours() < 10 ? ('0' + fechaDate.getHours()) : fechaDate.getHours();
      let minutos = fechaDate.getMinutes() < 10 ? ('0' + fechaDate.getMinutes()) : fechaDate.getMinutes();
      fechaDate.setMinutes(fechaDate.getMinutes() + turno.duracion)
      let horaFin = fechaDate.getHours() < 10 ? ('0' + fechaDate.getHours()) : fechaDate.getHours();
      let minutosFin = fechaDate.getMinutes() < 10 ? ('0' + fechaDate.getMinutes()) : fechaDate.getMinutes();

      if(mostrarEspecialidad)
      return turno.dia + ' - ' + turno.fechaString + ' - ' + horaInicio + ':' + minutos + ' a ' + horaFin + ':' + minutosFin + ' - ' + turno.especialidad;
      else
      return turno.dia + ' - ' + turno.fechaString + ' - ' + horaInicio + ':' + minutos + ' a ' + horaFin + ':' + minutosFin;
    }
  }
}
