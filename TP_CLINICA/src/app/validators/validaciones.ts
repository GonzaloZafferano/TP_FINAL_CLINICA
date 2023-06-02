import { ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import { UsuarioService } from "../services/usuarios.service";

export function validarConfirmacionDeClave(minCaracteres: number): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const clave = formGroup.get('clave');
    const confirmarClave = formGroup.get('confirmarClave');
    const errors: any = {};

    if (clave?.value !== confirmarClave?.value)
      errors['clavesDistintas'] = { hayError: true, mensajeError: 'Las clave y confirmación NO conciden.' };

    if (confirmarClave == null || confirmarClave.value == null || (confirmarClave.value != '' && confirmarClave.value.length < 4))
      errors.longitudInvalida = { hayError: true, mensajeError: `La confirmación de clave debe contener por lo menos ${minCaracteres} caracteres. \n` };

    if (Object.keys(errors).length) {
      formGroup.get('confirmarClave')?.setErrors(errors);
      return errors;
    }
    formGroup.get('confirmarClave')?.setErrors(null);
    return null;
  };
}

export function validarCorreo(): ValidatorFn {
  return (control: AbstractControl) => {
    const patronCorreo = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
    let mensajeError = '';
    let error = false;

    if (control != null && control.value != null && control.value.length > 0 && !patronCorreo.test(control.value)) {
      mensajeError += "El formato de correo electrónico es invalido. "
      error = true;
    }

    if (error) {
      const objError = { errorCorreo: mensajeError };
      control?.setErrors(objError);
      return objError;
    }

    control?.setErrors(null);
    return null;
  };
}

export function validarSiUsuarioExiste(usuarioService: UsuarioService): ValidatorFn {
  return (control: AbstractControl) => {
    const nombreUsuario = control.value;
    return usuarioService.traerListaDeCorreosFiltrada(nombreUsuario)
      .then((usuarios : any )=> {
        if (usuarios.length > 0) {
          const objError = { errorUsuario: "El nombre de usuario ya existe." };
          control.setErrors(objError);
          return objError;
        }
        return null;
      })
  };
};

export function validarSiUsuarioExisteAsync(usuarioService: UsuarioService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const nombreUsuario = control.value;
    return usuarioService.traerListaDeUsuariosFiltradaConObservable(nombreUsuario)
      .pipe(map((usuarios : any )=> {
        if (usuarios.length > 0) {
          const objError = { errorUsuario: "El nombre de usuario ya existe." };
          control.setErrors(objError);
          return objError;
        }
        return null;
      }));
  };
};

export function validarSiCorreoExisteAsync(usuarioService: UsuarioService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const correo = control.value;
    return usuarioService.traerListaDeCorreosFiltradaConObservable(correo)
      .pipe(map((correos : any) => {
        if (correos.length > 0) {
          let mensajeError = "El correo electrónico ingresado ya existe.";
          const objError = { errorCorreo: mensajeError };
          control.setErrors(objError);
          return objError;
        }
        return null;
      }));
  };
};