import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  obtenerExcelDeUnaHoja(data: any[], filename: string, sheetname: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { [sheetname]: worksheet }, SheetNames: [sheetname] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, filename + '.xlsx');
  }

  obtenerExcelDeVariasHojas(dataSets: any[], filename: string, sheetnames: string[], anchos: number[]) {
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };
    for (let i = 0; i < dataSets.length; i++) {
      const dataSet = dataSets[i];
      const sheetname = sheetnames[i];
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataSet);

      // Establecer ancho de columnas en el objeto worksheet['!cols']
      const columnWidths = anchos; // Ancho deseado para cada columna (en píxeles)
      worksheet['!cols'] = columnWidths.map(width => ({ width }));

      workbook.SheetNames.push(sheetname);
      workbook.Sheets[sheetname] = worksheet;
    }

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); 
    const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }); 
    saveAs(excelBlob, filename + '.xlsx');
  }
}

