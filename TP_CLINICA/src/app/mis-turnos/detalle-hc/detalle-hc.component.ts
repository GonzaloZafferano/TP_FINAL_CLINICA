import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalle-hc',
  templateUrl: './detalle-hc.component.html',
  styleUrls: ['./detalle-hc.component.css']
})
export class DetalleHCComponent {
  @Input() dato: any;
  @Output() OnCerrar = new EventEmitter<any>();
  
  cerrar() {
    this.OnCerrar.emit();
  }
}
