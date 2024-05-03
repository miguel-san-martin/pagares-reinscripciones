import { inject } from "@angular/core";
import { CampamentoIestService } from "../services/campamento-iest.service";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { SnackbarComponent } from "./snackbar/snackbar.component";

export class FormBase extends SnackbarComponent{

  fb = inject(FormBuilder);
  Service = inject(CampamentoIestService);

  public form!:FormArray|FormGroup;

  constructor(){
    super()

  }

  closePeriode(){
    this.form.disable()
  }

  openPeriode(){
    this.form.enable()
  }


}
