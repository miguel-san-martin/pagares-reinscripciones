import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[pagoVerde]',
  standalone: true
})
export class PagoVerdeDirective {

  constructor(private el: ElementRef) {}

  @HostBinding('style.color')
  get color(): string {
    return this.el.nativeElement.textContent === 'Pagado' ? 'green' : 'red';
  }

}
