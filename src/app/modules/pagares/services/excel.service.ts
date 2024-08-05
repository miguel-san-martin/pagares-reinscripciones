import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  generateExcel(data: any[], fileName: string): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Hoja 1');
    // Add headers
    const headers = Object.keys(data[0]);

    const camposRequeridos = [
      'idPerson',
      'nombre',
      'costoInsumos',
      'nombreResponsable',
      'idGrado',
    ];
    const nombresHeader = [
      'ID_PERSON',
      'NOMBRE',
      'COSTO_INSUMO',
      'NOMBRE_RESPONSABLE',
      'ABR_CARRERA',
    ];
    worksheet.addRow(nombresHeader);
    // Add data

    data.forEach((item) => {
      const row: any[] = [];
      camposRequeridos.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });

    worksheet.getCell('A1').font = { bold: true };
    worksheet.getCell('B1').font = { bold: true };
    worksheet.getCell('C1').font = { bold: true };
    worksheet.getCell('D1').font = { bold: true };
    worksheet.getCell('E1').font = { bold: true };

    worksheet.getColumn(1).width = 10;
    worksheet.getColumn(2).width = 40;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 40;
    worksheet.getColumn(5).width = 10;

    // Save the workbook to a blob
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${fileName}.xlsx`);
    });
  }
}
