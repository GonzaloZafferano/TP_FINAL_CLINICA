import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalstorageService } from './localstorage.service';
import { UsuarioService } from './usuarios.service';
import { getAuth, sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // suscripcion: any;
  // usuarioActual: any;

  // /**
  //  * Esta variable me permite controlar en tiempo real si hay un usuario logueado.
  //  * Se actualiza cada vez que alguien se loguea o desloguea.
  //  */
  // usuarioEstaLogueado: boolean = false;

  // /**
  //  * Esta propiedad no se actualiza en tiempo real.
  //  * requiere ser invocada para informar si el usuario esta logueado. 
  //  * Pero la ventaja es que al invocarse, da una respuesta inmediata sin delay.
  //  * Es decir, al iniciar sesion se usa esta prop. Para control en tiempo real, la variable.
  //  */
  // get getUsuarioEstaLogueado() {
  //   this.usuarioEstaLogueado = this.localStorage.obtenerItem('usuarioClinica') != null;
  //   return this.usuarioEstaLogueado;
  // }

  // get getUsuarioActualBasico() {
  //   return this.localStorage.obtenerItem('usuarioClinica');
  // }

  // get getUsuarioActualCompleto() {
  //   return this.usuarioActual;
  // }

  constructor(private auth: AngularFireAuth,    
    private localStorage: LocalstorageService) {
    // this.suscripcion = this.auth.authState.subscribe(usuario => {
    //   if (usuario) {       
    //       this.usuarioActual = usuario;
    //       this.localStorage.guardarItem('usuarioClinica', { id: usuario.uid, mail: usuario.email });
    //       this.usuarioEstaLogueado = true;      
    //   }
    // });
  }

  logIn(correo: string, clave: string) {  
      return this.auth.signInWithEmailAndPassword(correo, clave);   
  }

  logOut() {
    this.localStorage.eliminarItem('usuarioClinica');
    return this.auth.signOut();
  }

  registrarUsuario(correo: string, clave: string) {
    return this.auth.createUserWithEmailAndPassword(correo, clave);
  }

  async registrarUsuarioConVerificacion(correo: string, clave: string): Promise<any> {
    const resultado = await this.auth.createUserWithEmailAndPassword(correo, clave);
    this.enviarCorreoDeVerificacion();
    return resultado;
  }

  async enviarCorreoDeVerificacion() {
    return (await this.auth.currentUser)?.sendEmailVerification();
  }

  ObtenerCambiosDeEstado() {
    return this.auth.authState;
  }

  async ObtenerFireAuthCurrentUser(){
    return await this.auth.currentUser;
  }

  async enviarCorreoDeVerificacion_2() {
    let auth = getAuth();
    sendEmailVerification(auth?.currentUser!)
  }

  TESTobtenerUsuarioRegistrado() {
    this.auth.authState.subscribe(usuario => {
      console.log(usuario);
    })
  }
}