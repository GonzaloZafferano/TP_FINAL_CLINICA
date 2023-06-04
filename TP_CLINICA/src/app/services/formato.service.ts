import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  constructor() { }
  
  /**
   * Formatea una fecha a String.
   * @param fecha fecha (formato DATE)
   * @param aaaaMMdd True para obtener un resultado 'aaaa-mm-dd'. False (por defecto) para obtener 'dd-mm-aaaa'
   * @param hms True para obtener 'hh:mm:ss:mmm' en el resultado. False (por defecto) para no incluirlo en el resultado.
   * @returns Fecha formateada.
   */
  fechaToString(fecha: any, aaaaMMdd: boolean = false, hms: boolean = false) {
    if (fecha) {
      let dia = fecha.getDate();
      let mes = fecha.getMonth() + 1;
      let anio = fecha.getFullYear();

      let cadenaDia = dia < 10 ? '0' + dia.toString() : dia.toString();
      let cadenaMes = mes < 10 ? '0' + mes.toString() : mes.toString();

      if (hms) {
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();
        let miliSegundos = fecha.getMilliseconds();

        let cadenaHoras = hora < 10 ? '0' + hora.toString() : hora.toString();
        let cadenaMinutos = minutos < 10 ? '0' + minutos.toString() : minutos.toString();
        let cadenaSegundos = segundos < 10 ? '0' + segundos.toString() : segundos.toString();

        if (aaaaMMdd)
          return anio.toString() + '-' + cadenaMes + '-' + cadenaDia + ' ' + cadenaHoras + ':' + cadenaMinutos + ':' + cadenaSegundos + ':' + miliSegundos;
        return cadenaDia + '-' + cadenaMes + '-' + anio.toString() + ' ' + cadenaHoras + ':' + cadenaMinutos + ':' + cadenaSegundos + ':' + miliSegundos;
      }
      if (aaaaMMdd)
        return anio.toString() + '-' + cadenaMes + '-' + cadenaDia;
      return cadenaDia + '-' + cadenaMes + '-' + anio.toString();
    }
    return '';
  }

    /**
   * Elimina espacios extras.
   * @param texto texto a formatear.
   * @returns cadena sin espacios extras.
   */
    eliminarEspacios(texto: string) {
      if (texto && texto != '') {
        return texto.replace(/\s+/g, ' ').trim();
      }
      return '';
    }
  
    /**
     * Elimina espacios extras, y retorna la cadena en minusculas o mayusculas.
     * @param texto Texto a formatear
     * @param minusculas True para obtener el formato en minusculas, false para obtenerlo en mayusculas.
     * @returns cadena formateada
     */
    eliminarEspaciosYPasarAMin_May(texto: string, minusculas: boolean = true) {
      if (texto && texto != '') {
        if (minusculas)
          return this.eliminarEspacios(texto).toLowerCase();
        else
          return this.eliminarEspacios(texto).toUpperCase();
      }
      return '';
    }
  
    /**
     * Elimina los espacios extras, transforma el texto en minusculas y capitaliza la primer letra de cada palabra.
     * @param texto texto a formatear.
     * @returns texto formateado.
     */
    formatearYCapitalizarPalabras(texto: string) {
      if (texto && texto != '') {
        let textoFormateado = this.eliminarEspaciosYPasarAMin_May(texto);
        let palabras = textoFormateado.split(' ');
        let palabrasConMayusculas = palabras.map((palabra: string) => palabra.charAt(0).toUpperCase() + palabra.slice(1));
        return palabrasConMayusculas.join(' ');
      }
      return '';
    }
}
