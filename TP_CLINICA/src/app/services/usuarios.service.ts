import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Usuario } from '../models/class/usuario';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private nombreColeccion: string = 'usuarios';

  constructor(private firestoreDB: FirestoreService) {
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

  traerListaDeUsuariosFiltradaConObservable(columna: string, valor : any) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, columna, TipoIgualdad.igual, valor);
  }

  traerListaDeCorreosFiltrada(correoElectronico: string) {
    return this.firestoreDB.traerListaDeObjetosFiltrada(this.nombreColeccion, 'correo', TipoIgualdad.igual, correoElectronico);
  }

  traerListaDeDniFiltradaConObservable(dni: string) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, 'dni', TipoIgualdad.igual, dni);
  }
}
