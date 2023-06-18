import { Injectable } from '@angular/core';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private nombreColeccion: string = 'logs';
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

  traerListaDeItemsFiltradaCon_DESIGUALDAD_Observable(columna: string, valor: any) {
    return this.firestoreDB.traerListaDeObjetosFiltradaConObservable(this.nombreColeccion, columna, TipoIgualdad.distinto, valor);
  }

  traerListaDeItemsFiltradoPor_TRES_CamposDe_IGUALDAD(columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any, columna3: string, valorBuscado3: any) {
    return this.firestoreDB.traerListaDeObjetosCon_TRES_FiltrosDe_IGUALDAD_ConObservable(this.nombreColeccion, columna1, valorBuscado1, columna2, valorBuscado2, columna3, valorBuscado3);
  }

  traerListaFiltradaPor_UN_Campo(campo: string, valor: any) {
    return this.firestoreDB.traerListaDeObjetosFiltrada(this.nombreColeccion, campo, TipoIgualdad.igual, valor);
  }

  traerListaFiltradaPor_UN_Campo_DESIGUALDAD(campo: string, valor: any) {
    return this.firestoreDB.traerListaDeObjetosFiltrada(this.nombreColeccion, campo, TipoIgualdad.distinto, valor);
  }

  traerListaFiltradaPor_DOS_CamposObservable(columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any) {
    return this.firestoreDB.traerListaDeObjetosCon_DOS_FiltrosDe_IGUALDAD_ConObservable(this.nombreColeccion, columna1, valorBuscado1, columna2, valorBuscado2);
  }
  traerListaFiltradaPor_DOS_Campos(columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any) {
    return this.firestoreDB.traerListaDeObjetosCon_DOS_FiltrosDe_IGUALDAD(this.nombreColeccion, columna1, valorBuscado1, columna2, valorBuscado2);
  }

  traerListaFiltradaPor_DOS_Campos_IGUALDAD_DESIGUALDAD(columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any) {
    return this.firestoreDB.traerListaDeObjetosCon_UnFiltro_IGUALDAD_YUNO_DESIGUALDAD(this.nombreColeccion, columna1, valorBuscado1, columna2, valorBuscado2);
  }

  traerListaFiltradaPor_TRES_Campos(columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any, columna3: string, valorBuscado3: any) {
    return this.firestoreDB.traerListaDeObjetosCon_TRES_FiltrosDe_IGUALDAD(this.nombreColeccion, columna1, valorBuscado1, columna2, valorBuscado2, columna3, valorBuscado3);
  }

  traerListaFiltradaPor_TRES_Campos_I_I_D_Observable(columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any, columna3: string, valorBuscado3: any) {
    return this.firestoreDB.traerListaDeObjetosCon_TRES_Filtros_I_I_D_ConObservable(this.nombreColeccion, columna1, valorBuscado1, columna2, valorBuscado2, columna3, valorBuscado3);
  }

  public traerListaFiltradaPor_DOS_Campos_D_I_Observable(columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any) {
    return this.firestoreDB.traerListaDeObjetosCon_DOS_FiltrosDe_D_I_ConObservable(this.nombreColeccion, columna1, valorBuscado1, columna2, valorBuscado2);
  }  
}
