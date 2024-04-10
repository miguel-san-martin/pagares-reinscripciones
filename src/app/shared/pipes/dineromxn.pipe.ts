import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dineromxn',
  standalone: false
})
export class DineromxnPipe implements PipeTransform {

  // Entra 2500.0000 a $2,500,000
  transform(cantidad: string): string {


    const [parteEntera, parteDecimal] = cantidad.split(".");
    const numeroFormateado = `${parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`

    return `$${numeroFormateado}`;
  }

}
