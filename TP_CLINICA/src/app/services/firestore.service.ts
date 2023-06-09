import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';

import { Orden } from 'src/app/models/enums/orden';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) { }

  /**
   * Guarda el objeto y le asigna un ID automaticamente.
   * @param nombreColeccion nombre de la tabla.
   * @param objetoAGuardar objeto a guardar en la tabla.
   * @returns Promise<void>
   */
  guardarObjetoSinIdAsignado(nombreColeccion: string, objetoAGuardar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoNuevo: DocumentReference<DocumentData> = doc(coleccion);
    objetoAGuardar.id = documentoNuevo.id;
    return setDoc(documentoNuevo, objetoAGuardar);
  }

  /**
   * Guarda el objeto con el ID que ya tenga asignado previamente.
   * @param nombreColeccion nombre de la tabla.
   * @param objetoAGuardar objeto a guardar en la tabla.
   * @returns Promise<void>
   */
  guardarObjetoConIdAsignado(nombreColeccion: string, objetoAGuardar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoNuevo: DocumentReference<DocumentData> = doc(coleccion, objetoAGuardar.id);
    return setDoc(documentoNuevo, objetoAGuardar);
  }

  /**
   * Obtiene el elemento por Id. Retorna Observable (Con una lista de 1 item. Si no lo encuentra, retorna la lista vacia).
   * @param nombreColeccion nombre de la coleccion.
   * @param id Id del objeto que se desea traer.
   * @returns Observable<DocumentData[]>
   */
  traerObjetoPorId_Observable(nombreColeccion: string, id: string) {
    return this.traerListaDeObjetosFiltradaConObservable(nombreColeccion, 'id', TipoIgualdad.igual, id);
  }

  /**
  * Obtiene el elemento por Id. Retorna Promesa (Con el objeto. Si no lo encuentra, retorna null).
  * @param nombreColeccion nombre de la coleccion.
  * @param id Id del objeto que se desea traer.
  * @returns Promise<DocumentData | null>
  */
  async traerObjetoPorId_Promesa(nombreColeccion: string, id: string) {
    let items = await this.traerListaDeObjetosFiltrada(nombreColeccion, 'id', TipoIgualdad.igual, id);
    if (items && items.length > 0)
      return items[0];
    return null;
  }

  async traerListaDeObjetos(nombreColeccion: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const docs = await getDocs(coleccion).then((docs) => {
      return docs;
    });
    const listaDeObjetos: DocumentData[] = [];
    docs.forEach((item) => {
      listaDeObjetos.push(item.data());
    });
    return listaDeObjetos;
  }

  traerListaDeObjetosConObservable(nombreColeccion: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(coleccion);
  }

  /**
  * Retorna una lista de objetos filtrada segun el criterio.
  ** IMPORTANTE
  ** 'in/not in' requieren un Array con los valores buscados. 
  * @param nombreColeccion Nombre de la tabla.
  * @param columna Columna para la busqueda.
  * @param tipoIgualdad Tipo de igualdad.
  * @param valorBuscado Valor buscado. 
  * @returns Promise<DocumentData[]>
  */
  async traerListaDeObjetosFiltrada(nombreColeccion: string, columna: string, tipoIgualdad: TipoIgualdad, valorBuscado: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    let q;
    switch (tipoIgualdad) {
      case TipoIgualdad.igual:
        q = query(coleccion, where(columna, '==', valorBuscado));
        break;
      case TipoIgualdad.distinto:
        q = query(coleccion, where(columna, '!=', valorBuscado));
        break;
      case TipoIgualdad.mayor:
        q = query(coleccion, where(columna, '>', valorBuscado));
        break;
      case TipoIgualdad.mayorOIgual:
        q = query(coleccion, where(columna, '>=', valorBuscado));
        break;
      case TipoIgualdad.menor:
        q = query(coleccion, where(columna, '<', valorBuscado));
        break;
      case TipoIgualdad.menorOIgual:
        q = query(coleccion, where(columna, '<=', valorBuscado));
        break;
      case TipoIgualdad.in:
        q = query(coleccion, where(columna, 'in', valorBuscado));
        break;
      case TipoIgualdad.not_in:
        q = query(coleccion, where(columna, 'not-in', valorBuscado));
        break;
    }
    const docs = await getDocs(q).then((docs) => {
      return docs;
    });
    const listaDeObjetos: DocumentData[] = [];
    docs.forEach((item) => {
      listaDeObjetos.push(item.data());
    });
    return listaDeObjetos;
  }

  /**
   * Retorna una lista de objetos filtrada segun el criterio.
   ** IMPORTANTE
   ** 'in/not' in requieren un Array con los valores buscados. 
   * @param nombreColeccion Nombre de la tabla.
   * @param columna Columna para la busqueda.
   * @param tipoIgualdad Tipo de igualdad.
   * @param valorBuscado Valor buscado. 
   * @returns Observable<DocumentData[]>
   */
  traerListaDeObjetosFiltradaConObservable(nombreColeccion: string, columna: string, tipoIgualdad: TipoIgualdad, valorBuscado: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    switch (tipoIgualdad) {
      case TipoIgualdad.igual:
        return collectionData(query(coleccion, where(columna, '==', valorBuscado)));
      case TipoIgualdad.distinto:
        return collectionData(query(coleccion, where(columna, '!=', valorBuscado)));
      case TipoIgualdad.mayor:
        return collectionData(query(coleccion, where(columna, '>', valorBuscado)));
      case TipoIgualdad.mayorOIgual:
        return collectionData(query(coleccion, where(columna, '>=', valorBuscado)));
      case TipoIgualdad.menor:
        return collectionData(query(coleccion, where(columna, '<', valorBuscado)));
      case TipoIgualdad.menorOIgual:
        return collectionData(query(coleccion, where(columna, '<=', valorBuscado)));
      case TipoIgualdad.in:
        return collectionData(query(coleccion, where(columna, 'in', valorBuscado)));
      case TipoIgualdad.not_in:
        return collectionData(query(coleccion, where(columna, 'not-in', valorBuscado)));
    }
  }

  traerListaDeObjetosCon_DOS_FiltrosDe_IGUALDAD_ConObservable(nombreColeccion: string, columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion, where(columna1, '==', valorBuscado1), where(columna2, '==', valorBuscado2)));
  }

  traerListaDeObjetosCon_TRES_FiltrosDe_IGUALDAD_ConObservable(nombreColeccion: string, columna1: string, valorBuscado1: any, columna2: string, valorBuscado2: any, columna3: string, valorBuscado3: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion, where(columna1, '==', valorBuscado1), where(columna2, '==', valorBuscado2), where(columna3, '==', valorBuscado3)));
  }

  async traerListaDeObjetosOrdenada(nombreColeccion: string, columna: string, orden: Orden = Orden.asc) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    let q;
    if (orden == Orden.asc)
      q = query(coleccion, orderBy(columna, 'asc'));
    else
      q = query(coleccion, orderBy(columna, 'desc'));
    const docs = await getDocs(q).then((docs) => {
      return docs;
    });
    const listaDeObjetos: DocumentData[] = [];
    docs.forEach((item) => {
      listaDeObjetos.push(item.data());
    });
    return listaDeObjetos;
  }

  traerListaDeObjetosOrdenadaConObservable(nombreColeccion: string, columna: string, orden: Orden = Orden.asc) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    if (orden == Orden.asc)
      return collectionData(query(coleccion, orderBy(columna, 'asc')));
    else
      return collectionData(query(coleccion, orderBy(columna, 'desc')));
  }

  modificarObjeto(nombreColeccion: string, objetoAModificar: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoOriginal: DocumentReference<DocumentData> = doc(coleccion, objetoAModificar.id);
    return updateDoc(documentoOriginal, { ...objetoAModificar });
  }

  eliminarObjeto(nombreColeccion: string, id: string) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    const documentoAEliminar: DocumentReference<DocumentData> = doc(coleccion, id);
    return deleteDoc(documentoAEliminar);
  }

  /**
   * Obtiene una lista de elementos, que tienen en su campo ARRAY, el elemento EXACTO que se recibe por parametro.
   * @param nombreColeccion Nombre de lista.
   * @param campo Campo donde se busca.
   * @param objetoExactoQueSeBusca Objeto EXACTO que se desea buscar, con todas las propiedades especificadas.
   * @returns elementos cuyo array contiene el elemento EXACTO que se recibe por parametro.
   */
  obtenerElementosDeListasConCoincidenciaExacta(nombreColeccion: string, campo: string, objetoExactoQueSeBusca: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion, where(campo, 'array-contains', objetoExactoQueSeBusca)));
  }

  /**
   * Obtiene una lista de elementos, que tienen en su campo ARRAY, el elemento EXACTO que se recibe por parametro.
   * @param nombreColeccion Nombre de lista.
   * @param campo Campo donde se busca.
   * @param listaConElementosExactosQueSeBuscan lista que contiene los Objetos EXACTOS que se desea buscar, con todas las propiedades especificadas.
   * @returns elementos cuyo array contiene alguno de los elementos EXACTOS que se reciben por parametro.
   */
  obtenerElementosQueContienenEnSuListaAlMenosUnElementoExactoDeOtraLista(nombreColeccion: string, campo: string, listaConElementosExactosQueSeBuscan: any) {
    const coleccion: CollectionReference<DocumentData> = collection(this.firestore, nombreColeccion);
    return collectionData(query(coleccion, where(campo, 'array-contains-any', listaConElementosExactosQueSeBuscan)));
  }
}
