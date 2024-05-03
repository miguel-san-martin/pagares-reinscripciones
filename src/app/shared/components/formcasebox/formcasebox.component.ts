import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'shrd-formcasebox',
  templateUrl: './formcasebox.component.html',
  styleUrl: './formcasebox.component.scss',
})
export class FormcaseboxComponent {
  fb = inject(FormBuilder);
  @Input() formGroupIn: any;
  @Input() nameTitle: string = "Missing title";
  @Input() keys: string[]| null = null;


  getIndexFormControlName(i: number, time: string): any {
    let myArray: FormControl;
    myArray = this.formGroupIn.get([time, i, 'cost']) as FormControl;
    return myArray;
  }
}
