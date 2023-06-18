import { Injectable } from '@angular/core';
import { TextOptionsLight, jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() { }

  generatePDF(titulo: string, texto: string[]) {
    const doc = new jsPDF();

    ///////////////////////////////////////////////////////////////TITULO
    const title = titulo;

    // Calcula la posición para centrar verticalmente el título
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
    const titleX = (pageWidth - titleWidth) / 2;

    // Agrega el título al PDF
    doc.text(title, titleX, 20);

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
    doc.addImage(imageUrl, options.format, options.x, options.y, options.width, options.height);

    /////////////////////////////////////////////////////////////CONTENIDO
    const text = texto;

    // Configura las opciones de formato para el texto
    const textOptions: TextOptionsLight = {
      align: 'left',
    };

    let altura = 50; //ALTURA INICIAL DEL TEXTO.

    for (let i = 0; i < text.length; i++) {
      // Calcula las líneas del texto
      const maxWidth = 190; // Ancho máximo para cada línea
      const textLines = doc.splitTextToSize(text[i], maxWidth);

      // Altura de línea (segun texto).
      const lineHeight = doc.getTextDimensions(textLines).h; 

      //Si la altura ACTUAL donde se deberia escribir, 
      //MAS la actura del texto que se va a escribir
      //es MAYOR que la altura de la pagina, entonces necesitamos pedir otra pagina.
      if (altura + lineHeight > doc.internal.pageSize.height) {
        doc.addPage(); // Agrega una nueva página   
        
        //Le pongo titulo y LOGO
        doc.text(title, titleX, 20);
        doc.addImage(imageUrl, options.format, options.x, options.y, options.width, options.height);
        
        //Reseteo la altura del nuevo texto.
        altura = 50;
      }
      // Agrega las líneas de texto al PDF
      doc.text(textLines, 10, altura, textOptions);
      altura += 10 * textLines.length;
    }

    ///////////////////////////////////////////////////////////////////PIE
    doc.text(`Fecha de emisión: ${new Date().toLocaleString()}`, 10, altura, { align: 'justify' });

    doc.save('historia_clinica.pdf');
  }
}
