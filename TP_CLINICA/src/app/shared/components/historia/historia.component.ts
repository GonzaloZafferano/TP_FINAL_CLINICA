import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HcService } from 'src/app/services/hc.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent {
@Input() historia : any;
@Output() OnCerrar: EventEmitter<any> = new EventEmitter();
  constructor(private usuarioService : UsuarioService, private historiaService : HcService){}

  cerrar(){
    this.OnCerrar.emit();
  }
}
