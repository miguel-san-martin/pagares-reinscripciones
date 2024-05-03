import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { RequestOperationGen } from "../../../../interfaces/request/request-operation-gen";
import { ConsultaFecha } from "../../../../interfaces/responses/consulta-fecha";
import { CostoPromesaResponse } from "../../../../interfaces/responses/costo-promesas.interface";
import { SelectedPagareGeneracion } from "../../../../interfaces/selected-pagare-generacion";
import { PagareReinscripcionesService } from "../../services/pagare-reinscripciones.service";


@Component({
  templateUrl: './configuracion-generacion.component.html',
  styleUrl: '../../../../shared/scss/custom-template-miguel-v2.scss',
})
export class ConfiguracionGeneracionComponent implements OnInit {
  FB = inject(FormBuilder);
  Service = inject(PagareReinscripcionesService);

  formIsVisible = false;
  sliderValue = 8;
  public myForm!: FormGroup;
  public get getFormControlArray() {
    return this.myForm.get('fechasPromesas') as FormArray;
  }

  ngOnInit(): void {
    this.resetForm();
    if (this.sliderValue == 1) this.addDate();
  }

  public resetForm() {
    this.myForm = this.FB.group({
      monto: [0, Validators.required],
      cantidadPromesas: [1],
      fechasPromesas: this.FB.array([]),
    });
  }

  //Añade campos al formulario de fechas
  private addDate(date: Date | null = null) {
    const grupo = this.FB.group({
      date: [date, Validators.required],
    });
    this.getFormControlArray.push(grupo);
  }

  // Borra el control de fechas, recibe arrayDates, los va añadiendo uno a uno.
  private setDateOnInputs(arrayDates: Date[]) {
    this.getFormControlArray.setValue([]);
    arrayDates.forEach((row: Date) => {
      this.addDate(row);
    });
  }

  //Metodo que se ejecuta cuando detecta un detectSliderChange en la barra
  public detectSliderChange() {

    const size = this.getFormControlArray.length;
    if (size < this.sliderValue) {
      while (this.getFormControlArray.length < this.sliderValue) {
        this.addDate();
      }
    } else {
      while (this.getFormControlArray.length > this.sliderValue) {
        this.getFormControlArray.removeAt(this.sliderValue);
      }
    }
  }

  /**
   * Al seleccionar un select se manda a llamar para solicitar al back la informacion que poner en los input
   *
   * @param {SelectedPagareGeneracion} {catalog: idOperacion, generation: idGeneracion}
   * @memberof ConfiguracionGeneracionComponent
   */
  public loadDataOnForm({catalog: idOperacion, generation: idGeneracion}: SelectedPagareGeneracion) {
    // Limpiar formulario
    this.resetForm();
    this.formIsVisible = true;

    //Info que se mandara para consulta
    const extra: RequestOperationGen = {
      idOperacion: idOperacion,
      idGeneracion: idGeneracion,
    };

    //Set Monto
    this.Service.ConsultarCostoPromesas(extra).subscribe(
      (response: CostoPromesaResponse[]) => {
        const { promesas, costo } = response[0];
        this.sliderValue = Number(promesas);
        this.myForm.patchValue({
          monto: Number(costo),
          cantidadPromesas: Number(promesas),
        });
      },
    );

    //Set Fechas
    this.Service.ConsultarFechasPromesas(extra).subscribe(
      (response: ConsultaFecha[]) => {
        const fechasDate: Date[] = [];
        response.forEach(({ FechaVencimiento }) => {
          fechasDate.push(new Date(FechaVencimiento));
        });
        this.setDateOnInputs(fechasDate);
      },
    );
  }

  // Metodo que se ejecuta con el onsumit
  onSave() {
    // Tomar las fechas y las pone en formato 04-abr-24|04-abr-24|06-abr-24|26-abr-24|27-abr-24|26-abr-24|30-abr-24
    let fechasConcat: string = '';
    let fechas = this.myForm.get('fechasPromesas')?.value;
    fechas = fechas.map((row: any) => {
      fechasConcat = fechasConcat + this.Service.formatearFecha(row.date) + '|';
      return this.Service.formatearFecha(row.date);
    });

    fechasConcat = fechasConcat.slice(0, fechasConcat.length - 1);

    console.log(fechasConcat);

    this.myForm.patchValue({
      cantidadPromesas: this.sliderValue,
    });

    const monto = this.myForm.get('monto')?.value;

  }
}
