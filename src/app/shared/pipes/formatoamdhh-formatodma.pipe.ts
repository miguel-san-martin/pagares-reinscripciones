import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AMDtoDMA',
  standalone: true
})
export class FormatoamdhhFormatodmaPipe implements PipeTransform {

  transform(fecha: string): string|null {
    let salida;
    salida = fecha.slice(0, -9);
    salida = salida.trim();
    const fechas:string[] = salida.split("-")

    return ``;
  }

}

