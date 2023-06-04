import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private nombreColeccion: string = 'especialidades';

  constructor(private firestoreDB: FirestoreService) {
  }

  cargarEspecialidadConIdAsignado(especialidad: any) {
    return this.firestoreDB.guardarObjetoConIdAsignado(this.nombreColeccion, { ...especialidad });
  }

  cargarEspecialidadSinIdAsignado(especialidad: any) {
    return this.firestoreDB.guardarObjetoSinIdAsignado(this.nombreColeccion, { ...especialidad });
  }

  async traerEspecialidadPorId(id: string) {
    return this.firestoreDB.traerObjetoPorId_Promesa(this.nombreColeccion, id);
  }

  obtenerListaDeEspecialidades() {
    return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion);
  }

  obtenerListadoDeEspecialidadesObservable() {
    return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion);
  }

  modificarEspecialidad(especialidad: any) {
    return this.firestoreDB.modificarObjeto(this.nombreColeccion, especialidad);
  }

  eliminarEspecialidad(id: string) {
    return this.firestoreDB.eliminarObjeto(this.nombreColeccion, id);
  }

  traerListaDeEspecialidadesFiltradaConObservable(nombre: string) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, 'nombre', TipoIgualdad.igual, nombre);
  }
}
