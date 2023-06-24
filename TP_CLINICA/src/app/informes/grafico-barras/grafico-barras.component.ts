import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent {
  @ViewChild('graficos', { static: true }) graficos!: ElementRef;
  @Input() data : any;
  @Input() labels : any;
  @Input() titulo : any;
  chart: any;

  public charts(tipo : number) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.graficos.nativeElement, {
      type: tipo == 0? 'bar' : tipo == 1 ? 'pie' : tipo == 2 ? 'bubble' : tipo == 3 ? 'line' : tipo == 4? 'doughnut' : 
      tipo == 5 ? 'polarArea' : tipo == 6 ? 'scatter' : 'radar',
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar el tamaño sin mantener el aspecto original
        // Otros ajustes y opciones del gráfico
        // backgroundColor(ctx, options) {
        //   return '#FFFFFF'
        // },         
        plugins: {
          legend: {                 
            labels: {
              font: {
                // size: fotos.length > 18 ? 10 : 12, // Ajusta el tamaño de fuente de las etiquetas del gráfico
                size : 36
              },
              padding: 3,
              //  textAlign : 'left', 
              color: '#000000'
            },
            // align :'start'
          },      
          // Cambia el color de las etiquetas
        },
        scales: tipo == 1  ? undefined :  {
          y: {  // not 'yAxes: [{' anymore (not an array anymore)
            ticks: {
              color: "#000000", // not 'fontColor:' anymore                             
              font: {
                size: 36, // 'size' now within object 'font {}'
              },
              stepSize: 1,            
            }
          },
          x: {  // not 'xAxes: [{' anymore (not an array anymore)
            ticks: {
              color: "#000000",  // not 'fontColor:' anymore
              //fontSize: 14,
              font: {
                size: 36 // 'size' now within object 'font {}'
              },
              stepSize: 1,
              // beginAtZero: true
            }
          }
        }
      },
      data: {

        labels: this.labels, //['Manzana', 'Banana', 'Naranja'],
        datasets: [{
          label: this.titulo,         
          data: this.data,
       //   backgroundColor: '#C04A42',
      
backgroundColor : [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#33FF99',
  '#9966FF',
  '#FF9900',
  '#00CCFF',
  '#FF66CC',
  '#33CC33',
  '#FF3366'
]
      //     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          //hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
    });
  }
}
