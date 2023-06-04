import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, concat, defer, ignoreElements, } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {
  constructor(private storage: AngularFireStorage, private toast: ToastService) { }

  /**
   * Guarda el archivo y retorna el Observable, a traves del cual podemos obtener la URL del archivo.
   ** USO: 
   ** this.firestorage.guardarArchivo(archivo, 'nombre')?.subscribe(url =>{ obtengo la URL });
   * @param archivo Archivo que se guardara.
   * @param nombreArchivo Nombre del archivo.
   * @returns Observable. Al suscribirse, se obtiene la URL del archivo.
   */
  guardarArchivo(archivo: File, nombreArchivo: string): Observable<string> {
    const fileRef = this.storage.ref(nombreArchivo);
    const task = this.storage.upload(nombreArchivo, archivo);
    return concat(
      task.snapshotChanges().pipe(ignoreElements()),
      defer(() => fileRef.getDownloadURL())
    );
  }

  /**
   * Guarda el archivo y retorna una promesa.
   ** USO:
   ** (await this.firestorage.guardarArchivoV2(archivo, 'nombre'))?.subscribe(url =>{ obtengo la URL });
   * @param archivo Archivo que se guardara.
   * @param nombreArchivo Nombre del archivo.
   * @returns Promesa. Null en caso de error.
   */
  async guardarArchivoV2(archivo: File, nombreArchivo: string) {
    try {
      const ref = this.storage.ref(nombreArchivo);
      const task = await ref.put(archivo);
      return ref.getDownloadURL();
    } catch (error: any) {
      this.toast.error(error.message);
      return null;
    }
  }

  /** Obtiene un archivo de Firestorage.
   * Requiere la URL del archivo: 
   ** https://firebasestorage...
   * @param url URL del archivo. 
   */
  obtenerArchivoPorURL(url: string) {
    return this.storage.storage.refFromURL(url);
  }  

  /** Elimina un archivo de Firestorage.
  * Requiere la RUTA COMPLETA del archivo: 
  ** imagenes/nombreArchivo
  * @param url URL del archivo. 
  */
  eliminarArchivoPorRutaAbsoluta(ruta: string) {
    const ref = this.storage.ref(ruta);
    return ref.delete();
  }

  /** Elimina un archivo de Firestorage.
   * Requiere la URL del archivo: 
   ** https://firebasestorage...
   * @param url URL del archivo. 
   */
  eliminarArchivoPorURL(url: string) {
    const refFromUrl = this.obtenerArchivoPorURL(url);
    const ref = this.storage.ref(refFromUrl.fullPath);
    return ref.delete();
  }
}
