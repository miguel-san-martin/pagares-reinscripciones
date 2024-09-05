import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToMxn',
  standalone: false,
})
export class NumberToMxnPipe implements PipeTransform {
  // Entra 2500 a $2,500,000

  transform(cantidad: string): string {
    console.log(cantidad.length);
    if (Number(cantidad) > 0) {
      const [parteEntera, parteDecimal] = cantidad.split('.');

      const numeroFormateado = `${parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
      return `$${numeroFormateado}`;
    }

    return '';
  }
}
