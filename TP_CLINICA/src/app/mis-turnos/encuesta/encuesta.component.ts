import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  @Input() turno: any;
  @Output() onEncuestaCompletada: EventEmitter<any> = new EventEmitter();
  @Output() onEncuestaCancelada: EventEmitter<any> = new EventEmitter();
  atencion: number = 1; //1 a 5
  sistemas: number = 1; //1 a 5
  volver: number = 1;//1 a 2
  recomendar: number = 1; //1 a 2

  constructor(private swalService: SwalService) { }

  atencionSeleccionada(indice: number) {
    this.atencion = indice;
  }

  sistemaSeleccionado(indice: number) {
    this.sistemas = indice;
  }

  volverSeleccionado(indice: number) {
    this.volver = indice;
  }

  recomendarSeleccionado(indice: number) {
    this.recomendar = indice;
  }

  guardar(input: HTMLTextAreaElement) {
    if (input.value && input.value.trim() != '') {
      this.turno.realizoEncuesta = true;
      this.turno.datosEncuesta = {
        volver :this.volver,
        recomendar : this.recomendar,
        atencion : this.atencion,
        sistema : this.sistemas,
        comentarios : input.value
      }
      this.onEncuestaCompletada.emit(this.turno);
    } else {
      this.swalService.info('Debe ingresar un comentario.');
    }
  }

  cancelar() {
    this.onEncuestaCancelada.emit();
  }
}
