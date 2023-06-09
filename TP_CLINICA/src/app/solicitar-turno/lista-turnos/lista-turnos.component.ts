import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent {
 @Input() spinner : boolean = false;
 @Input() turnos : any; 
 @Output() OnSeleccionTurno = new EventEmitter<any>();
 
 seleccionTurno(turno : any){
   this.OnSeleccionTurno.emit(turno);   
 }
}
