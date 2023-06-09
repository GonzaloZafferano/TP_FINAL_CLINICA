import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especialistas'
})
export class EspecialistasPipe implements PipeTransform {

  transform(especialista: any): string {
    let retorno = '';
    if (especialista) {

      retorno = especialista.nombre + ' ' + especialista.apellido;
      let especialidades = '';
  
      if (especialista.especialidades && especialista.especialidades.length > 0) {
        for (let i = 0; i < especialista.especialidades.length; i++) {
          if (especialidades != '') {
            especialidades += ' - ' + especialista.especialidades[i].nombre;
          } else {
            especialidades = ' - Especialidades: ' + ' ' + especialista.especialidades[i].nombre ;
          }
        }
      }
      retorno += especialidades;
    }
    return retorno;
  }
}
