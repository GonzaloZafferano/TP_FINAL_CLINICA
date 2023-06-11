import { NgPlural } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent {
  filaSeleccionada: any;
  @Input() spinner: boolean = false;
  @Input() turnos: any = null;
  @Output() OnSeleccionTurno = new EventEmitter<any>();

  seleccionTurno(turno: any) {
    this.OnSeleccionTurno.emit(turno);
  }
  seleccionFila(turno: any) {
    this.filaSeleccionada = turno;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filaSeleccionada = null;
  }
}
