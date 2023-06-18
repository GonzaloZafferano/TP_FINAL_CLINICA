import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datosTurno'
})
export class DatosTurnoPipe implements PipeTransform {

  transform(dato: any): string {
    let fecha = new Date(dato.fechaHC).toLocaleString(); //.toLocaleDateString();
    let retorno = `Fecha: ${fecha}. Médico: ${dato.medico.apellido}, ${dato.medico.nombre}. Especialidad: ${dato.especialidad}. 
    Altura: ${dato.altura} mt. Peso. ${dato.peso} kg. Temperatura: ${dato.temperatura} °C. Presión: ${dato.presion1}/${dato.presion2} mmHg. Datos adicionales: `;
    if (dato.hayDatos) {
      for (let prop in dato) {
        if (prop != 'medico' && prop != 'altura' &&
          prop != 'especialidad' && prop != 'fechaHC' &&
          prop != 'hayDatos' && prop != 'presion1' &&
          prop != 'presion2' && prop != 'peso' && prop != 'temperatura'
        ) {
          retorno += `${prop} : ${dato[prop]}. `;
        }
      }
    } else {
      retorno += ' - : -';
    }

    return retorno;
  }

}
