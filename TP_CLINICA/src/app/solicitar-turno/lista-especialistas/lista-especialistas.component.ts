import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.css']
})
export class ListaEspecialistasComponent {
  filaSeleccionada: any;
  @Input() spinner: boolean = false;
  @Input() especialistas: any;
  @Input() titulo: any = 'Lista de Especialistas';
  @Output() OnSeleccionEspecialista = new EventEmitter<any>();

  seleccionEspecialista(especialista: any) {
    this.filaSeleccionada = especialista;
    this.OnSeleccionEspecialista.emit(especialista);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filaSeleccionada = null;
  }
}
