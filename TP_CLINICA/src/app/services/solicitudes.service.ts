import { Injectable } from '@angular/core';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private nombreColeccion: string = 'solicitudes';
  public usuariosEnEspera : number = 0;

  constructor(private firestoreDB: FirestoreService) {
  }

  cargarSolicitudConIdAsignado(solicitud: any) {
    return this.firestoreDB.guardarObjetoConIdAsignado(this.nombreColeccion, { ...solicitud });
  }

  cargarSolicitudSinIdAsignado(solicitud: any) {
    return this.firestoreDB.guardarObjetoSinIdAsignado(this.nombreColeccion, { ...solicitud });
  }

  async traerSolicitudPorId(id: string) {
    return this.firestoreDB.traerObjetoPorId_Promesa(this.nombreColeccion, id);
  }

  traerSolicitudPorId_Observable(id: string) {
    return this.firestoreDB.traerObjetoPorId_Observable(this.nombreColeccion, id);
  }

  obtenerListaDeSolicitudes() {
    return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion);
  }

  obtenerListadoDeSolicitudesObservable() {
    return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion);
  }

  modificarSolicitud(solicitud: any) {
    return this.firestoreDB.modificarObjeto(this.nombreColeccion, solicitud);
  }

  eliminarSolicitud(id: string) {
    return this.firestoreDB.eliminarObjeto(this.nombreColeccion, id);
  }

  traerListaDeSolicitudesFiltradaConObservable(columna: string, valor: any) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, columna, TipoIgualdad.igual, valor);
  }
}
