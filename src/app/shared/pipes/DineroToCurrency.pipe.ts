import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DineroToCurrency',
  standalone: false,
})
export class DineroToCurrencyPipe implements PipeTransform {
  // Entra 2500.0000 a $2,500,000
  transform(value: string): string {
    // const [parteEntera, parteDecimal] = cantidad.split(".");
    // const numeroFormateado = `${parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    //
    // return `$${numeroFormateado}`;
    if (isNaN(Number(value)) || value == null) {
      return '';
    }
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(Number(value));
  }
}
