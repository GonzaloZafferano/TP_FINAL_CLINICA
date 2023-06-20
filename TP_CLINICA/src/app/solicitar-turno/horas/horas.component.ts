import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.css']
})
export class HorasComponent {
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
