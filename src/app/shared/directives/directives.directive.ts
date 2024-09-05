import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[pagoVerde]',
  standalone: false,
})
export class PagoVerdeDirective {
  constructor(private el: ElementRef) {}

  @HostBinding('style.color')
  get color(): string {
    return this.el.nativeElement.textContent === 'Pagado' ? 'green' : 'red';
  }
}
