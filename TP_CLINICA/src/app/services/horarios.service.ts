import { Injectable } from '@angular/core';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private nombreColeccion: string = 'horarios';

  constructor(private firestoreDB: FirestoreService) {
  }

  cargarItemConIdAsignado(item: any) {
    return this.firestoreDB.guardarObjetoConIdAsignado(this.nombreColeccion, { ...item });
  }

  cargarItemSinIdAsignado(item: any) {
    return this.firestoreDB.guardarObjetoSinIdAsignado(this.nombreColeccion, { ...item });
  }

  async traerItemPorId(id: string) {
    return this.firestoreDB.traerObjetoPorId_Promesa(this.nombreColeccion, id);
  }

  traerItemPorId_Observable(id: string) {
    return this.firestoreDB.traerObjetoPorId_Observable(this.nombreColeccion, id);
  }

  obtenerListaDeItems() {
    return this.firestoreDB.traerListaDeObjetos(this.nombreColeccion);
  }

  obtenerListadoDeItemsObservable() {
    return this.firestoreDB.traerListaDeObjetosConObservable(this.nombreColeccion);
  }

  modificarItem(item: any) {
    return this.firestoreDB.modificarObjeto(this.nombreColeccion, item);
  }

  eliminarItem(id: string) {
    return this.firestoreDB.eliminarObjeto(this.nombreColeccion, id);
  }

  traerListaDeItemsFiltradaConObservable(columna: string, valor: any) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, columna, TipoIgualdad.igual, valor);
  }

  traerListaDeItemsFiltradoPor_TRES_CamposDe_IGUALDAD(columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any, columna3: string, valorBuscado3: any) {
    return this.firestoreDB.traerListaDeObjetosCon_TRES_FiltrosDe_IGUALDAD_ConObservable(this.nombreColeccion, columna1, valorBuscado1, columna2, valorBuscado2, columna3, valorBuscado3);
  }
}
