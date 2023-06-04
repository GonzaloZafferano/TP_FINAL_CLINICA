import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() { }

  exito(mensaje: string, titulo: string = '') {
    Swal.fire({
      title: titulo != '' ? titulo : 'AVISO',
      text: mensaje,
      icon: 'success',
      //showCancelButton: true,
      //cancelButtonText: 'Cerrar',
      confirmButtonText: 'Aceptar',
      customClass: {
        container: 'sw-container',
        cancelButton: 'sw-cancel',
        confirmButton: 'sw-confirm',
        title: 'sw-title',
        htmlContainer: 'sw-texto',
        popup: 'sw-popup',
      },
      reverseButtons: true
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        Swal.close();
      }
    });
  }

  error(mensaje: string, titulo: string = '') {
    Swal.fire({
      title: titulo != '' ? titulo : 'AVISO',
      text: mensaje,
      icon: 'error', //info
      //showCancelButton: true,
      //cancelButtonText: 'Cerrar',
      confirmButtonText: 'Aceptar',
      reverseButtons: true,
      customClass: {
        container: 'sw-container-error',
        cancelButton: 'sw-cancel',
        confirmButton: 'sw-confirm',
        title: 'sw-title',
        htmlContainer: 'sw-texto',
        popup: 'sw-popup',
      },
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        Swal.close();
      }
    });
  }
}
