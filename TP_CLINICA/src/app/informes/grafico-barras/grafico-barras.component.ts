import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import jsPDF from 'jspdf';
import 'chartjs-plugin-datalabels';

//DATALABELS PARA QUE SE VEAN LOS LABELS SIEMPRE Y NO SOLO CON EL HOVER.
//npm install chart.js@latest --save
//npm install chartjs-plugin-datalabels@latest --save
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent {
  @ViewChild('graficos', { static: true }) public graficos!: ElementRef;
  @Input() data: any;
  @Input() labels: any;
  @Input() titulo: any;
  @Input() titulopdf: any;
  chart: any;

  public charts(tipo: number) {
    //SI YA HAY UN GRAFICO, DESTRUILO
    if (this.chart) {
      this.chart.destroy();
    }

    const miFondo: any = {
      id: 'miFondo',
      beforeDraw: (chart: any, options: any) => {
        const { ctx, width, height } = chart;
        ctx.fillStyle = 'white',
          ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }
    }

    const margenLeyenda = {
      id: 'margenLeyenda',
      beforeInit(chart: any, legend: any, options: any) {
        const fitValue = chart.legend.fit;

        chart.legend.fit = function fit() {
          fitValue.bind(chart.legend)();
          return this.height += 50;
        }
      }
    }

    this.chart = new Chart(this.graficos.nativeElement, {
      type: tipo == 0 ? 'bar' : tipo == 1 ? 'pie' : tipo == 2 ? 'bubble' : tipo == 3 ? 'line' : tipo == 4 ? 'doughnut' :
        tipo == 5 ? 'polarArea' : tipo == 6 ? 'scatter' : 'radar',

      options: {
        layout: {
          padding: {
            left: 30,
            right: 30,
            top: 10,
            bottom: 50
          },
        },
        // backgroundColor : '#FF0000',
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar el tamaño sin mantener el aspecto original
        // Otros ajustes y opciones del gráfico
        plugins: {

          datalabels: {
            display: true, // Mostrar las etiquetas de datos siempre
            anchor: 'end',
            align: 'end',
            font: {
              size: 36
            }
            //CON ESTA FUNCION PUEDO DETERMINAR QUE SE MUESTRA DE LOS LABELS
            //Val seria el valor actual que se muestra del label.
            // formatter:  (val: any) => (val != '' ? 'Lalal' : ''),
          },
          legend: {

            labels: {
              font: {
                // size: fotos.length > 18 ? 10 : 12, // Ajusta el tamaño de fuente de las etiquetas del gráfico
                size: 36
              },

              padding: 50,
              //  textAlign : 'left', 
              color: '#000000'
            },
            // align :'start'
          },
          // Cambia el color de las etiquetas         
        },
        scales: tipo == 1 ? undefined : {
          y: {  // not 'yAxes: [{' anymore (not an array anymore)
            display: true,
            ticks: {
              display: true,
              padding: 5,
              color: "#000000", // not 'fontColor:' anymore                             
              font: {
                size: 36, // 'size' now within object 'font {}'
              },
              stepSize: 1,
              backdropPadding: {
                top: 100,
                height: 200,
                bottom: 100
              },
            },
          },
          x: {  // not 'xAxes: [{' anymore (not an array anymore)
            display: true,
            ticks: {
              display: true,
              padding: 5,
              color: "#000000",  // not 'fontColor:' anymore
              //fontSize: 14,
              font: {
                size: 36, // 'size' now within object 'font {}',

              },
              stepSize: 1,
              backdropPadding: {
                top: 100,
                height: 100,
                bottom: 100
              }
              // beginAtZero: true
            }
          }
        }
      },
      data: {
        labels: this.labels, //['Manzana', 'Banana', 'Naranja'],        

        datasets: [{

          label: this.titulo,
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'end',
          },
          data: this.data,
          //   backgroundColor: '#C04A42',

          backgroundColor: [
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

      //ACA AGREGO MIS PERSONALIZACIONES.
      plugins: [miFondo, ChartDataLabels, margenLeyenda] //DATALABELS PARA QUE SE VEAN LOS LABELS SIEMPRE Y NO SOLO CON EL HOVER.
      //FIN DE PERSONALIZACION.

    });
  }

  downloadPDF() {
    const chartCanvas = this.graficos.nativeElement;
    const chartImage = chartCanvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF();

    //titulo
    const pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
    const titleWidth = pdf.getStringUnitWidth(this.titulo) * pdf.getFontSize() / pdf.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;
    // Agrega el título al PDF
    pdf.text(this.titulo, titleX, 20);

    /////////////////////////////////////////////////////////////////LOGO
    const imageUrl = 'assets/logo/logo512x512.png';
    const options = { // Opciones de formato para la imagen
      format: 'png',
      x: 170, // Posición horizontal de la imagen en el PDF
      y: 10, // Posición vertical de la imagen en el PDF
      width: 30, // Ancho de la imagen en el PDF
      height: 30 // Alto de la imagen en el PDF
    };

    // Agrega la imagen al PDF
    pdf.addImage(imageUrl, options.format, options.x, options.y, options.width, options.height);

    // Ajusta el tamaño del archivo PDF según el tamaño del gráfico
    const chartWidth = chartCanvas.width / 10;
    const chartHeight = chartCanvas.height / 8;
    pdf.addImage(chartImage, 'JPEG', 10, 40, chartWidth, chartHeight);


    pdf.text(`Fecha de emisión: ${new Date().toLocaleString()}`, 10, pdf.internal.pageSize.height - 10, { align: 'justify' });

    // Descarga el archivo PDF con un nombre específico
    pdf.save(this.titulopdf + '.pdf');
  }
}
