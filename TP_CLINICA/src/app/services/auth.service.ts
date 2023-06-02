import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) { }

  logIn(correo: string, clave: string) {
    return this.auth.signInWithEmailAndPassword(correo, clave);
  }

  logOut() {
    return this.auth.signOut();
  }

  registrarUsuario(correo: string, clave: string) {
    return this.auth.createUserWithEmailAndPassword(correo, clave);
  }

  mensajesErroresAuth(e: any): string {
    let mensajeError = '';
    switch (e.code) {
      case 'auth/invalid-email':
        mensajeError = "Formato de correo electrónico inválido.";
        break;
      case 'auth/missing-password':
        mensajeError = "Falta ingresar la contraseña.";
        break;
      case 'auth/weak-password':
        mensajeError = "La contraseña debe contener al menos 6 caracteres.";
        break;
      case 'auth/email-already-in-use':
        mensajeError = "El correo electrónico ingresado ya está en uso.";
        break;

      default:
        mensajeError = "Ha ocurrido un error y no se pudo registrar el usuario.";
        break;
    }
    return mensajeError;
  }

  obtenerUsuarioRegistrado() {
    this.auth.authState.subscribe(usuario => {
      console.log(usuario);
    })
  }

}
