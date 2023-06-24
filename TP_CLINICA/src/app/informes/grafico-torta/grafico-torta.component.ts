import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-grafico-torta',
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.css']
})
export class GraficoTortaComponent {
  @ViewChild('graficos', { static: true }) graficos!: ElementRef;
  @Input() data : any;
  @Input() labels : any;
  @Input() titulo : any;
  chart: any;

}
