import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalleshc',
  templateUrl: './detalleshc.component.html',
  styleUrls: ['./detalleshc.component.css']
})
export class DetalleshcComponent {
  @Input() dato: any;
  @Output() OnCerrar = new EventEmitter<any>();
  
  cerrar() {
    this.OnCerrar.emit();
  }
}
