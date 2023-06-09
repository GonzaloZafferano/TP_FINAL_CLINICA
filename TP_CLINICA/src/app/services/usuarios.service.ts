import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Usuario } from '../models/class/usuario';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private nombreColeccion: string = 'usuarios';
  private usuario: any;
  suscripcion: any;

  /**
   * Esta variable me permite controlar en tiempo real si hay un usuario logueado.
   * Se actualiza cada vez que alguien se loguea o desloguea.
   */
  usuarioEstaLogueado: boolean = false;

  /**
   * Esta propiedad no se actualiza en tiempo real.
   * requiere ser invocada para informar si el usuario esta logueado. 
   * Pero la ventaja es que al invocarse, da una respuesta inmediata sin delay.
   * Es decir, al iniciar sesion se usa esta prop. Para control en tiempo real, la variable.
   */
  get getUsuarioEstaLogueado() {
    this.usuarioEstaLogueado = this.localStorage.obtenerItem('usuarioClinica') != null;
    return this.usuarioEstaLogueado;
  }

  get getUsuarioActualBasico() {
    return this.localStorage.obtenerItem('usuarioClinica');
  }

  constructor(private firestoreDB: FirestoreService,
    private localStorage: LocalstorageService,
    private authService: AuthService,
    private router: Router) {
    this.suscripcion = this.authService.ObtenerCambiosDeEstado().subscribe(usuario => {
      if (usuario) {
        this.traerUsuarioPorId(usuario.uid).then((x: any) => {
          this.localStorage.guardarItem('usuarioClinica', { id: usuario.uid, mail: usuario.email, perfil: x?.perfil });
          this.usuarioEstaLogueado = true;
        });
      }
    });
  }

  async obtenerUsuarioActual(idUsuario: number = 0) {
    if (!this.usuario) {
      let id = idUsuario != 0 ? idUsuario : this.getUsuarioActualBasico?.id
      if (id) {
        this.usuario = await this.traerUsuarioPorId(id);
      }
    }
    return this.usuario;
  }

  cargarUsuarioActual(usuario: any) {
    this.usuario = usuario;
  }

  limpiarUsuarioActual() {
    this.usuario = null;
  }

  cerrarSesionUsuario() {
    this.limpiarUsuarioActual();
    this.localStorage.eliminarItem('usuarioClinica');
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  cargarUsuarioConIdAsignado(usuario: any) {
    return this.firestoreDB.guardarObjetoConIdAsignado(this.nombreColeccion, { ...usuario });
  }

  cargarUsuarioSinIdAsignado(usuario: any) {
    return this.firestoreDB.guardarObjetoSinIdAsignado(this.nombreColeccion, { ...usuario });
  }

  async traerUsuarioPorId(idUsuario: string) {
    return this.firestoreDB.traerObjetoPorId_Promesa(this.nombreColeccion, idUsuario);
  }

  traerUsuarioPorId_Observable(idUsuario: string) {
    return this.firestoreDB.traerObjetoPorId_Observable(this.nombreColeccion, idUsuario);
  }

  obtenerListaDeUsuarios() {
    return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion);
  }

  obtenerListadoDeUsuariosObservable() {
    return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion);
  }

  modificarUsuario(usuario: Usuario) {
    return this.firestoreDB.modificarObjeto(this.nombreColeccion, usuario);
  }

  eliminarUsuario(id: string) {
    return this.firestoreDB.eliminarObjeto(this.nombreColeccion, id);
  }

  traerListaDeCorreosFiltradaConObservable(correoElectronico: string) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, 'correo', TipoIgualdad.igual, correoElectronico);
  }

  traerListaDeUsuariosFiltradaConObservable(columna: string, valor: any) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, columna, TipoIgualdad.igual, valor);
  }

  traerListaDeCorreosFiltrada(correoElectronico: string) {
    return this.firestoreDB.traerListaDeObjetosFiltrada(this.nombreColeccion, 'correo', TipoIgualdad.igual, correoElectronico);
  }

  traerListaDeDniFiltradaConObservable(dni: string) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, 'dni', TipoIgualdad.igual, dni);
  }

  obtenerEspecialistaPorEspecialidad(especialidad: any) {
    return this.firestoreDB.obtenerElementosDeListasConCoincidenciaExacta(this.nombreColeccion, 'especialidades', especialidad);
  }
}
