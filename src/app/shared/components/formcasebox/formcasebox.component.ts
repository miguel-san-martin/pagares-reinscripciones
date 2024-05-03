import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MaterialModule } from '../../../material-module/material.module';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'shrd-formcasebox',
  standalone: true,
  imports: [MaterialModule, SharedModule],
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
