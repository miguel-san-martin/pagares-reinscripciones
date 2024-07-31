import {
  Component,
  ElementRef,
  input,
  InputSignal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-toast-iest',
  standalone: false,
  templateUrl: './toast-iest.component.html',
  styleUrl: './toast-iest.component.scss',
})
export class ToastIestComponent {
  @ViewChild('modal') modal!: ElementRef;
  public hidden: InputSignal<boolean> = input.required<boolean>();


  }


}
