import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CheckPago',
  standalone: true
})
export class PintarPagado implements PipeTransform {

  transform(value: string): string {
    if (value === 'Pagado') {
      return value.replace(/Pagado/g, '<span style="color: green;">Pagado</span>');
    } else {
      return value;
    }
  }

}
// 20291010|1910219|181019|1912910
