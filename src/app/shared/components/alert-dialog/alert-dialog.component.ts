import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shrd-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './../../scss/custom-template-miguel-v2.scss',
})
export class AlertDialogComponent<T> {
  @Input() msj?: string = 'Undefinited';
  @Output() actionYes: EventEmitter<T> = new EventEmitter();
  @Output() actionNo: EventEmitter<T> = new EventEmitter();
}
