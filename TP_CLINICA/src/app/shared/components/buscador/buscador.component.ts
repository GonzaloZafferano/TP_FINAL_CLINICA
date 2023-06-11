import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})

export class BuscadorComponent {
  @ViewChild('inputTexto', { static: false }) inputTexto: ElementRef | undefined;
  @Output() OnSeleccionElemento = new EventEmitter<any>();
  @Output() OnLimpiarBuscador = new EventEmitter<any>();
  @Input() limpiarDesdeExterior: boolean = false;
  @Input() titulo: string = '';
  @Input() funcionBuscador: any;
  @Input() funcionPipe: any;
  cargando: boolean = false;
  datos: any;

  constructor(private toastService: ToastService) { }

  async buscar() {
    this.cargando = true;
    if (this.funcionBuscador) {
      let texto = this.inputTexto?.nativeElement.value;
      this.datos = await this.funcionBuscador(texto);

      if (this.datos && this.datos.length == 0) {
        this.toastService.informacion('No se encontraron resultados.');
      }
    }
    this.cargando = false;
  }

  async keyDown(event: any) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      await this.buscar();
    }
  }

  ngOnChanges(event: any) {
    for (const propName in event) {
      if (event.hasOwnProperty(propName)) {
        if (propName === 'limpiarDesdeExterior') {
          this.limpiarSinEmitirEvento();
        }
      }
    }
  }

  pipe(item: any) {
    return this.funcionPipe(item);
  }

  limpiar() {
    this.limpiarSinEmitirEvento();
    this.OnLimpiarBuscador.emit();
  }

  limpiarSinEmitirEvento() {
    this.datos = null;

    const inputTexto = document.getElementById('inputTexto') as HTMLInputElement;
    inputTexto.disabled = false;
    inputTexto.value = '';

    (document.getElementById('btnBuscar') as HTMLButtonElement).disabled = false;
  }

  seleccionItem(item: any, input: HTMLInputElement) {
    this.datos = null;

    //Forma 1 (lo recibe por parametro)
    input.value = this.pipe(item);
    input.disabled = true;

    //Forma 2
    (document.getElementById('btnBuscar') as HTMLButtonElement).disabled = true;

    this.OnSeleccionElemento.emit(item);
  }
}
