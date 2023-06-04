import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) { }

  exito(mensaje: string = '', titulo: string = '', duracion: number = 3000) {
    const successOptions = {
      toastClass: 'toast-custom-success',
      timeOut: duracion,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-position',
    };

    this.toastr.success(mensaje != '' ? mensaje : 'Se ha completado la operación con éxito!.',
      titulo != '' ? titulo : 'Operación exitosa.',
      successOptions);
  }

  error(mensaje: string = '', titulo: string = '', duracion: number = 3000) {
    const errorOptions = {
      toastClass: 'toast-custom-error',
      timeOut: duracion,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-position',
    };

    this.toastr.error(mensaje != '' ? mensaje : 'Ha ocurrido un error al procesar la operación.',
      titulo != '' ? titulo : 'Ha ocurrido un error.',
      errorOptions);
  }

  informacion(mensaje: string = '', titulo: string = '', duracion: number = 3000) {
    const successOptions = {
      toastClass: 'toast-custom-info',
      timeOut: duracion,
      extendedTimeOut: 1000,
      enableHtml: true,
      positionClass: 'toast-custom-position',
      //closeButton : true,     
    };

    this.toastr.success(mensaje != '' ? mensaje : '',
      titulo != '' ? titulo : 'Aviso.',
      successOptions);
  }

}
