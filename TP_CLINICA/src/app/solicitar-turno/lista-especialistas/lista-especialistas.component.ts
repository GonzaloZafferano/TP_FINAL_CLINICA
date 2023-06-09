import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.css']
})
export class ListaEspecialistasComponent {
  @Input() spinner : boolean = false;
  @Input() especialistas : any; 
  @Input() titulo : any ='Lista de Especialistas'; 
  @Output() OnSeleccionEspecialista = new EventEmitter<any>();
  
  seleccionEspecialista(especialista : any){
    this.OnSeleccionEspecialista.emit(especialista);   
  }
}
