import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shrd-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent {
  @Input() msj?: string = 'Undefinited';
  @Output() actionYes:EventEmitter<any> = new EventEmitter();
  @Output() actionNo:EventEmitter<any> = new EventEmitter();


}
