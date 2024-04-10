import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AMDtoDMA',
  standalone: false
})
export class FormatoamdhhFormatodmaPipe implements PipeTransform {

  transform(fecha: string): string|null {
    let salida;
    salida = fecha.slice(0, -9);
    salida = salida.trim();
    const fechas:string[] = salida.split("-")

    return `${fechas[2]}-${fechas[1]}-${fechas[0]}`;
  }

}

