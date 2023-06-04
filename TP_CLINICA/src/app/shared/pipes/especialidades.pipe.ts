import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from 'src/app/models/class/especialista';

@Pipe({
  name: 'especialidades'
})
export class EspecialidadesPipe implements PipeTransform {

  transform(especialista: any): any {
    let texto = '';
    let especialidadesTexto = '';
    let especialidadesNuevas = '';

    if (especialista.especialidades.length > 0) {
      texto = 'Especialidades declaradas: '

      for (let especialidad of especialista.especialidades) {
        especialidadesTexto += especialidadesTexto != '' ? '/' + especialidad.nombre : especialidad.nombre;
      }
    }
    texto = texto + ' ' + (especialidadesTexto != '' ? especialidadesTexto : ' - ');

    if (especialista.otroEspecialidad != '') {
      especialidadesNuevas += 'Especialidad NUEVA: ' + especialista.otroEspecialidad;
    }
    return [texto, especialidadesNuevas];
  }
}
