import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import { UsuarioService } from "../services/usuarios.service";
import { ValidacionAsync } from "../models/class/validacionAsync";
import { EspecialidadService } from "../services/especialidad.service";
import { FormatoService } from "../services/formato.service";

/**
 * Aplica al control. Valida campos que deben recibir valores numericos (input text/number).
 * @param minimo valor minimo aceptado.
 * @param maximo valor maximo aceptado.
 * @param mensajes (opcional) recibe un objeto con los mensajes: {campoVacio, textoInvalido, valorInvalido}.
 * @returns Los errores encontrados, o en su defecto null.
 */
export function validarCampoNumero(minimo: number, maximo: number, mensajes: any = null): ValidatorFn {
  return (control: AbstractControl): [key: string, value: any] | null => {
    const campoAValidar = control;
    const errors: any = {};
    //CARGO LOS DISTINTOS ERRORES QUE PUEDE TENER.
    if (campoAValidar?.value == '' || campoAValidar?.value == null || campoAValidar?.value == undefined)
      errors.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
    else if (isNaN(campoAValidar?.value) || campoAValidar?.value?.includes('.') || campoAValidar?.value?.includes(','))
      errors.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : 'Solo se pueden ingresar caracteres numéricos.' };
    else if (campoAValidar?.value < minimo || campoAValidar?.value > maximo) {
      errors.valorInvalido = { hayError: true, mensaje: mensajes != null && mensajes.valorInvalido != null ? mensajes.valorInvalido : `Solo se admiten valores entre ${minimo} y ${maximo}.` };
    }
    //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    if (Object.keys(errors).length) {
      campoAValidar?.setErrors(errors);
      return errors;
    }
    campoAValidar?.setErrors(null);
    return null;
  }
}

export function validarCampoNumero_V2(minimo: number, maximo: number, mensajes: any = null, enteros: boolean = false): ValidatorFn {
  return (control: AbstractControl): [key: string, value: any] | null => {
    const campoAValidar = control;
    const errors: any = {};
    //CARGO LOS DISTINTOS ERRORES QUE PUEDE TENER.
    if (campoAValidar?.value == '' || campoAValidar?.value == null || campoAValidar?.value == undefined)
      errors.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
    //else if (isNaN(campoAValidar?.value) || campoAValidar?.value?.includes('.') || campoAValidar?.value?.includes(','))
    //  errors.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : 'Solo se pueden ingresar caracteres numéricos.' };
    else if (campoAValidar?.value < minimo || campoAValidar?.value > maximo) {
      errors.valorInvalido = { hayError: true, mensaje: mensajes != null && mensajes.valorInvalido != null ? mensajes.valorInvalido : `Solo se admiten valores entre ${minimo} y ${maximo}.` };
    }

    if (enteros) {
      if (campoAValidar?.value != null && (campoAValidar?.value.toString().includes('.') || campoAValidar?.value.toString().includes(','))) {
        errors.soloEnteros = { hayError: true, mensaje: mensajes != null && mensajes.valorInvalido != null ? mensajes.valorInvalido : `Solo se admiten números enteros.` };
      }
    }
    //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    if (Object.keys(errors).length) {
      campoAValidar?.setErrors(errors);
      return errors;
    }
    campoAValidar?.setErrors(null);
    return null;
  }
}

/**
* Aplica al control. Valida campos que deben recibir solo texto (input text/textArea).
* @param minimo minimo de caracteres.
* @param maximo maximo de caracteres.
* @param mensajes (opcional) recibe un objeto con los mensajes: {campoVacio, lenMinimo, lenMaximo, textoInvalido}.
* @param soloLetras (opcional) True por defecto. True para aceptar solo letras, false para acepte todo texto/numeros.
* @param espacios (opcional) True por defecto. True para aceptar espacios, false para que no.
* @returns Los errores encontrados, o en su defecto null.
*/
export function validarCampoTexto(minimo: number, maximo: number, mensajes: any = null, soloLetras: boolean = false, espacios: boolean = true): ValidatorFn {
  return (control: AbstractControl): [key: string, value: any] | null => {
    const campoAValidar = control;
    const errors: any = {};
    //CARGO LOS DISTINTOS ERRORES QUE PUEDE TENER.
    let campoVacio = campoAValidar?.value == null || campoAValidar?.value == undefined || campoAValidar?.value.trim() == '';
    if (campoVacio)
      errors.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
    else if (campoAValidar?.value.length < minimo)
      errors.lenMinimo = { hayError: true, mensaje: mensajes != null && mensajes.lenMinimo != null ? mensajes.lenMinimo : `Solo se admite un mínimo de ${minimo} caracteres.` };
    else if (campoAValidar?.value.length > maximo) {
      errors.lenMaximo = { hayError: true, mensaje: mensajes != null && mensajes.lenMaximo != null ? mensajes.lenMaximo : `Solo se admite un máximo de ${maximo} caracteres.` };
    }
    if (soloLetras) {
      let patron = espacios ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z]+$/;
      if (!campoVacio && !patron.test(campoAValidar.value)) {
        errors.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `Solo se admiten letras a-z ${espacios ? '' : '(sin espacios)'}.` };
      }
    } else {
      if (!espacios) {
        let patron = /\s/;
        if (!campoVacio && patron.test(campoAValidar.value)) {
          errors.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `No se admiten espacios.` };
        }
      }
    }
    //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    if (Object.keys(errors).length) {
      campoAValidar?.setErrors(errors);
      return errors;
    }
    campoAValidar?.setErrors(null);
    return null;
  }
}

export function validarCorreo(): ValidatorFn {
  return (control: AbstractControl) => {
    const campoAValidar = control;
    const patronCorreo = /^([a-zA-Z0-9_\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
    const errors: any = {};
    let campoVacio = campoAValidar?.value == null || campoAValidar?.value == undefined || campoAValidar?.value.trim() == '';
    if (campoVacio)
      errors.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
    else if (!patronCorreo.test(control.value)) {
      errors.formatoInvalido = { hayError: true, mensaje: "El formato de correo electrónico es invalido. " };
    }
    if (Object.keys(errors).length) {
      campoAValidar?.setErrors(errors);
      return errors;
    }
    campoAValidar?.setErrors(null);
    return null;
  };
}

export function validarConfirmacionDeClave(minCaracteres: number): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const clave = formGroup.get('clave');
    const confirmarClave = formGroup.get('confirmarClave');
    const errors: any = {};
    if (clave?.value !== confirmarClave?.value)
      errors['clavesDistintas'] = { hayError: true, mensaje: 'Las clave y confirmación NO conciden.' };
    let campoVacio = confirmarClave?.value == null || confirmarClave?.value == undefined || confirmarClave?.value.trim() == '';
    if (campoVacio)
      errors.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
    else if (confirmarClave?.value.length < minCaracteres)
      errors.longitudInvalida = { hayError: true, mensaje: `La confirmación de clave debe contener por lo menos ${minCaracteres} caracteres. \n` };

    if (Object.keys(errors).length) {
      confirmarClave?.setErrors(errors);
      return errors;
    }
    confirmarClave?.setErrors(null);
    return null;
  };
}

export function validarSiCorreoExisteAsync(usuarioService: UsuarioService, validador: ValidacionAsync, formatoService: FormatoService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    validador.validando = true;
    const correo = formatoService.eliminarEspaciosYPasarAMin_May(control.value);
    const errors: any = {};
    return usuarioService.traerListaDeCorreosFiltradaConObservable(correo)
      .pipe(map((correos: any) => {
        if (correos.length > 0) {
          errors.datoExistente = { hayError: true, mensaje: "El correo electrónico ingresado ya existe." };
          if (Object.keys(errors).length) {
            control?.setErrors(errors);
            validador.validando = false;
            return errors;
          }
        }
        control?.setErrors(null);
        validador.validando = false;
        return null;
      }));
  };
};

export function validarSiDniExisteAsync(usuarioService: UsuarioService, validador: ValidacionAsync): AsyncValidatorFn {
  return (control: AbstractControl) => {
    validador.validando = true;
    const dni = control.value;
    const errors: any = {};
    return usuarioService.traerListaDeDniFiltradaConObservable(dni)
      .pipe(map((dnis: any) => {
        if (dnis.length > 0) {
          errors.datoExistente = { hayError: true, mensaje: "El dni ingresado ya se encuentra cargado en el sistema." };
          if (Object.keys(errors).length) {
            control?.setErrors(errors);
            validador.validando = false;
            return errors;
          }
        }
        control?.setErrors(null);
        validador.validando = false;
        return null;
      }));
  };
};

export function validarSiEspecialidadExisteAsync(especialidadService: EspecialidadService, validador: ValidacionAsync, formatoService: FormatoService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    validador.validando = true;
    const especialidad = formatoService.eliminarEspaciosYPasarAMin_May(control.value);
    const errors: any = {};
    return especialidadService.traerListaDeEspecialidadesFiltradaConObservable(especialidad)
      .pipe(map((especialidades: any) => {
        if (especialidades.length > 0) {
          errors.datoExistente = { hayError: true, mensaje: "La especialidad ingresada ya existe." };
          if (Object.keys(errors).length) {
            control?.setErrors(errors);
            validador.validando = false;
            return errors;
          }
        }
        if (control?.errors) {
          validador.validando = false;
          return control?.errors;
        }

        control?.setErrors(null);
        validador.validando = false;
        return null;
      }));
  };
};

export function validarCampoArchivo(): ValidatorFn {
  return (control: AbstractControl): [key: string, value: any] | null => {
    const campoAValidar = control;
    const errors: any = {};
    //CARGO LOS DISTINTOS ERRORES QUE PUEDE TENER.
    if (campoAValidar?.value == '' || campoAValidar?.value == null || campoAValidar?.value == undefined)
      errors.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
    else {
      var nombreArchivo = campoAValidar?.value;
      var indicePunto = nombreArchivo.lastIndexOf(".") + 1;
      var extension = nombreArchivo.substr(indicePunto, nombreArchivo.length).toLowerCase();
      if (extension != "jpg" && extension != "jpeg" && extension != "png")
        errors.archivoInvalido = { hayError: true, mensaje: "Solo se admiten archivos de tipo jpg | jpeg | png." };
    }
    //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    if (Object.keys(errors).length) {
      campoAValidar?.setErrors(errors);
      return errors;
    }
    campoAValidar?.setErrors(null);
    return null;
  }
}

export function validarCampoSelect(): ValidatorFn {
  return (control: AbstractControl): [key: string, value: any] | null => {
    const campoAValidar = control;
    const errors: any = [];
    //CARGO LOS DISTINTOS ERRORES QUE PUEDE TENER.
    if (campoAValidar?.value == '' || campoAValidar?.value == null ||
      campoAValidar?.value == undefined || campoAValidar?.value == -1)
      errors.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };

    //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    if (Object.keys(errors).length) {
      campoAValidar?.setErrors(errors);
      return errors;
    }
    campoAValidar?.setErrors(null);
    return null;
  }
}


export function validarCampoOtro(minimo: number, maximo: number, nombreCampoOtro: string, nombreCampoAValidar: string, mensajes: any = null, soloLetras: boolean = false, espacios: boolean = true): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const otro = formGroup.get(nombreCampoOtro);
    const campoAValidar = formGroup.get(nombreCampoAValidar);

    if (otro && otro.value) {
      const errors: any = {};

      //CARGO LOS DISTINTOS ERRORES QUE PUEDE TENER.
      let campoVacio = campoAValidar?.value == null || campoAValidar?.value == undefined || campoAValidar?.value.trim() == '';
      if (campoVacio)
        errors.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
      else if (campoAValidar?.value.length < minimo)
        errors.lenMinimo = { hayError: true, mensaje: mensajes != null && mensajes.lenMinimo != null ? mensajes.lenMinimo : `Solo se admite un mínimo de ${minimo} caracteres.` };
      else if (campoAValidar?.value.length > maximo) {
        errors.lenMaximo = { hayError: true, mensaje: mensajes != null && mensajes.lenMaximo != null ? mensajes.lenMaximo : `Solo se admite un máximo de ${maximo} caracteres.` };
      }
      if (soloLetras) {
        let patron = espacios ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z]+$/;

        if (!campoVacio && !patron.test(campoAValidar?.value)) {
          errors.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `Solo se admiten letras a-z ${espacios ? '' : '(sin espacios)'}.` };
        }
      } else {
        if (!espacios) {
          let patron = /\s/;
          if (!campoVacio && patron.test(campoAValidar?.value)) {
            errors.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `No se admiten espacios.` };
          }
        }
      }
      //SI TIENE ERRORES, LOS SETEO AL CONTROL:
      if (Object.keys(errors).length) {
        campoAValidar?.setErrors(errors);
        return errors;
      }
    }

    campoAValidar?.setErrors(null);
    return null;
  }
}


export function validarCamposKeyValue(minimo: number, maximo: number, mensajes: any = null, soloLetras: boolean = false, espacios: boolean = true): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const opcionalNombre1 = formGroup.get('opcionalNombre1');
    const opcionalValor1 = formGroup.get('opcionalValor1');
    // const opcionalNombre2 = formGroup.get('opcionalNombre2');
    // const opcionalNombre3 = formGroup.get('opcionalNombre3');
    // const opcionalValor2 = formGroup.get('opcionalValor2');
    // const opcionalValor3 = formGroup.get('opcionalValor3');

    const errorN1: any = {};
    const errorV1: any = {};
    // const errorN2: any = {};
    // const errorN3: any = {};
    // const errorV2: any = {};
    // const errorV3: any = {};

    //PRIMER PAR VALUE KEY
    if (opcionalNombre1?.value.trim() != '' && opcionalValor1?.value.trim() == '') {
      errorV1.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
      opcionalValor1?.setErrors(errorV1);
      //return errorV1;
    } else {
      opcionalValor1?.setErrors(null);
    }

    if (opcionalNombre1?.value.trim() == '' && opcionalValor1?.value.trim() != '') {
      errorN1.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
      opcionalNombre1?.setErrors(errorN1);
      //return errorN1;
    } else {
      opcionalNombre1?.setErrors(null);
    }

    if (opcionalNombre1?.value != '') {
  
      let campoVacio = opcionalNombre1?.value == null || opcionalNombre1?.value == undefined || opcionalNombre1?.value.trim() == '';
      if (campoVacio)
      errorN1.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
      else if (opcionalNombre1?.value.length < minimo)
      errorN1.lenMinimo = { hayError: true, mensaje: mensajes != null && mensajes.lenMinimo != null ? mensajes.lenMinimo : `Solo se admite un mínimo de ${minimo} caracteres.` };
      else if (opcionalNombre1?.value.length > maximo) {
        errorN1.lenMaximo = { hayError: true, mensaje: mensajes != null && mensajes.lenMaximo != null ? mensajes.lenMaximo : `Solo se admite un máximo de ${maximo} caracteres.` };
      }
      if (soloLetras) {
        let patron = espacios ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z]+$/;
        if (!campoVacio && !patron.test(opcionalNombre1?.value)) {
          errorN1.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `Solo se admiten letras a-z ${espacios ? '' : '(sin espacios)'}.` };
        }
      } else {
        if (!espacios) {
          let patron = /\s/;
          if (!campoVacio && patron.test(opcionalNombre1?.value)) {
            errorN1.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `No se admiten espacios.` };
          }
        }
      }
      //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    }

    if (Object.keys(errorN1).length) {
      opcionalNombre1?.setErrors(errorN1);
      return errorN1;
    }
    opcionalNombre1?.setErrors(null);
    return null;




    // //SEGUNDO PAR VALUE KEY
    // if (opcionalNombre2?.value.trim()  != '' && opcionalValor2?.value.trim()  == '') {
    //   errorV2.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
    //   opcionalValor2?.setErrors(errorV2);
    //   return errorV2;
    // } else {
    //   opcionalValor2?.setErrors(null);
    // }

    // if (opcionalNombre2?.value.trim() == '' && opcionalValor2?.value.trim() != '') {
    //   errorN2.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
    //   opcionalNombre2?.setErrors(errorN1);
    //   //return errorN2;
    // } else {
    //   opcionalNombre2?.setErrors(null);
    // }


    // if (opcionalNombre2?.value != '') {
  
    //   let campoVacio = opcionalNombre2?.value == null || opcionalNombre2?.value == undefined || opcionalNombre2?.value.trim() == '';
    //   if (campoVacio)
    //   errorN2.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
    //   else if (opcionalNombre2?.value.length < minimo)
    //   errorN2.lenMinimo = { hayError: true, mensaje: mensajes != null && mensajes.lenMinimo != null ? mensajes.lenMinimo : `Solo se admite un mínimo de ${minimo} caracteres.` };
    //   else if (opcionalNombre2?.value.length > maximo) {
    //     errorN2.lenMaximo = { hayError: true, mensaje: mensajes != null && mensajes.lenMaximo != null ? mensajes.lenMaximo : `Solo se admite un máximo de ${maximo} caracteres.` };
    //   }
    //   if (soloLetras) {
    //     let patron = espacios ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z]+$/;
    //     if (!campoVacio && !patron.test(opcionalNombre2?.value)) {
    //       errorN2.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `Solo se admiten letras a-z ${espacios ? '' : '(sin espacios)'}.` };
    //     }
    //   } else {
    //     if (!espacios) {
    //       let patron = /\s/;
    //       if (!campoVacio && patron.test(opcionalNombre2?.value)) {
    //         errorN2.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `No se admiten espacios.` };
    //       }
    //     }
    //   }
    //   //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    //   if (Object.keys(errorN2).length) {
    //     opcionalNombre2?.setErrors(errorN2);
    //     return errorN2;
    //   }
    //   opcionalNombre2?.setErrors(null);
    //   return null;
    // }



    // //TERCER PAR VALUE KEY
    // if (opcionalNombre3?.value.trim()  != '' && opcionalValor3?.value.trim()  == '') {
    //   errorV3.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
    //   opcionalValor3?.setErrors(errorV3);
    //   return errorV3;
    // } else {
    //   opcionalValor3?.setErrors(null);
    // }

    // if (opcionalNombre3?.value.trim() == '' && opcionalValor3?.value.trim() != '') {
    //   errorN3.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
    //   opcionalNombre3?.setErrors(errorN3);
    //   //return errorN3;
    // } else {
    //   opcionalNombre3?.setErrors(null);
    // }

    // if (opcionalNombre3?.value != '') {
  
    //   let campoVacio = opcionalNombre3?.value == null || opcionalNombre3?.value == undefined || opcionalNombre3?.value.trim() == '';
    //   if (campoVacio)
    //   errorN3.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
    //   else if (opcionalNombre3?.value.length < minimo)
    //   errorN3.lenMinimo = { hayError: true, mensaje: mensajes != null && mensajes.lenMinimo != null ? mensajes.lenMinimo : `Solo se admite un mínimo de ${minimo} caracteres.` };
    //   else if (opcionalNombre3?.value.length > maximo) {
    //     errorN3.lenMaximo = { hayError: true, mensaje: mensajes != null && mensajes.lenMaximo != null ? mensajes.lenMaximo : `Solo se admite un máximo de ${maximo} caracteres.` };
    //   }
    //   if (soloLetras) {
    //     let patron = espacios ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z]+$/;
    //     if (!campoVacio && !patron.test(opcionalNombre3?.value)) {
    //       errorN3.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `Solo se admiten letras a-z ${espacios ? '' : '(sin espacios)'}.` };
    //     }
    //   } else {
    //     if (!espacios) {
    //       let patron = /\s/;
    //       if (!campoVacio && patron.test(opcionalNombre3?.value)) {
    //         errorN3.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `No se admiten espacios.` };
    //       }
    //     }
    //   }
    //   //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    //   if (Object.keys(errorN3).length) {
    //     opcionalNombre3?.setErrors(errorN3);
    //     return errorN3;
    //   }
    //   opcionalNombre3?.setErrors(null);
    //   return null;
    // }


    // return null;
  };
}




export function validarCamposKeyValue_v2(minimo: number, maximo: number, mensajes: any = null, soloLetras: boolean = false, espacios: boolean = true): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const opcionalNombre1 = formGroup.get('opcionalNombre2');
    const opcionalValor1 = formGroup.get('opcionalValor2');

    const errorN1: any = {};
    const errorV1: any = {};

    //PRIMER PAR VALUE KEY
    if (opcionalNombre1?.value.trim() != '' && opcionalValor1?.value.trim() == '') {
      errorV1.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
      opcionalValor1?.setErrors(errorV1);
      //return errorV1;
    } else {
      opcionalValor1?.setErrors(null);
    }

    if (opcionalNombre1?.value.trim() == '' && opcionalValor1?.value.trim() != '') {
      errorN1.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
      opcionalNombre1?.setErrors(errorN1);
      //return errorN1;
    } else {
      opcionalNombre1?.setErrors(null);
    }

    if (opcionalNombre1?.value != '') {
  
      let campoVacio = opcionalNombre1?.value == null || opcionalNombre1?.value == undefined || opcionalNombre1?.value.trim() == '';
      if (campoVacio)
      errorN1.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
      else if (opcionalNombre1?.value.length < minimo)
      errorN1.lenMinimo = { hayError: true, mensaje: mensajes != null && mensajes.lenMinimo != null ? mensajes.lenMinimo : `Solo se admite un mínimo de ${minimo} caracteres.` };
      else if (opcionalNombre1?.value.length > maximo) {
        errorN1.lenMaximo = { hayError: true, mensaje: mensajes != null && mensajes.lenMaximo != null ? mensajes.lenMaximo : `Solo se admite un máximo de ${maximo} caracteres.` };
      }
      if (soloLetras) {
        let patron = espacios ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z]+$/;
        if (!campoVacio && !patron.test(opcionalNombre1?.value)) {
          errorN1.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `Solo se admiten letras a-z ${espacios ? '' : '(sin espacios)'}.` };
        }
      } else {
        if (!espacios) {
          let patron = /\s/;
          if (!campoVacio && patron.test(opcionalNombre1?.value)) {
            errorN1.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `No se admiten espacios.` };
          }
        }
      }
      //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    }
    
    if (Object.keys(errorN1).length) {
      opcionalNombre1?.setErrors(errorN1);
      return errorN1;
    }
    opcionalNombre1?.setErrors(null);
    return null;

  };
}



export function validarCamposKeyValue_v3(minimo: number, maximo: number, mensajes: any = null, soloLetras: boolean = false, espacios: boolean = true): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const opcionalNombre1 = formGroup.get('opcionalNombre3');
    const opcionalValor1 = formGroup.get('opcionalValor3');

    const errorN1: any = {};
    const errorV1: any = {};

    //PRIMER PAR VALUE KEY
    if (opcionalNombre1?.value.trim() != '' && opcionalValor1?.value.trim() == '') {
      errorV1.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
      opcionalValor1?.setErrors(errorV1);
     // return errorV1;
    } else {
      opcionalValor1?.setErrors(null);
    }

    if (opcionalNombre1?.value.trim() == '' && opcionalValor1?.value.trim() != '') {
      errorN1.campoVacio = { hayError: true, mensaje: 'Campo requerido.' };
      opcionalNombre1?.setErrors(errorN1);
      //return errorN1;
    } else {
      opcionalNombre1?.setErrors(null);
    }

    if (opcionalNombre1?.value != '') {
  
      let campoVacio = opcionalNombre1?.value == null || opcionalNombre1?.value == undefined || opcionalNombre1?.value.trim() == '';
      if (campoVacio)
      errorN1.campoVacio = { hayError: true, mensaje: mensajes != null && mensajes.campoVacio != null ? mensajes.campoVacio : 'Campo requerido.' };
      else if (opcionalNombre1?.value.length < minimo)
      errorN1.lenMinimo = { hayError: true, mensaje: mensajes != null && mensajes.lenMinimo != null ? mensajes.lenMinimo : `Solo se admite un mínimo de ${minimo} caracteres.` };
      else if (opcionalNombre1?.value.length > maximo) {
        errorN1.lenMaximo = { hayError: true, mensaje: mensajes != null && mensajes.lenMaximo != null ? mensajes.lenMaximo : `Solo se admite un máximo de ${maximo} caracteres.` };
      }
      if (soloLetras) {
        let patron = espacios ? /^[a-zA-Z\s]+$/ : /^[a-zA-Z]+$/;
        if (!campoVacio && !patron.test(opcionalNombre1?.value)) {
          errorN1.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `Solo se admiten letras a-z ${espacios ? '' : '(sin espacios)'}.` };
        }
      } else {
        if (!espacios) {
          let patron = /\s/;
          if (!campoVacio && patron.test(opcionalNombre1?.value)) {
            errorN1.textoInvalido = { hayError: true, mensaje: mensajes != null && mensajes.textoInvalido != null ? mensajes.textoInvalido : `No se admiten espacios.` };
          }
        }
      }
      //SI TIENE ERRORES, LOS SETEO AL CONTROL:
    }
    
    if (Object.keys(errorN1).length) {
      opcionalNombre1?.setErrors(errorN1);
      return errorN1;
    }

    opcionalNombre1?.setErrors(null);
    return null;

  };
}