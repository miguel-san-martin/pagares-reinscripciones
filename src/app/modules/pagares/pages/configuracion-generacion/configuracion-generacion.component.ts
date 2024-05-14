import { AfterViewInit,Component,ElementRef,ViewChild,inject,signal } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { RequestOperationGen } from "../../../../interfaces/request/request-operation-gen";
import { ConsultaFecha } from "../../../../interfaces/responses/consulta-fecha";
import { CostoPromesaResponse } from "../../../../interfaces/responses/costo-promesas.interface";
import { SelectedPagareGeneracion } from "../../../../interfaces/selected-pagare-generacion";
import { PagareReinscripcionesService } from "../../services/pagare-reinscripciones.service";
import { RequestAltaPagare } from "app/interfaces/request/request-alta-pagare";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "@shared/components/snack-bar/snack-bar.component";

@Component({
  templateUrl: "./configuracion-generacion.component.html",
  styleUrl: "../../../../shared/scss/custom-template-miguel-v2.scss",
})
export class ConfiguracionGeneracionComponent implements AfterViewInit {
  private FB = inject(FormBuilder);
  private Service = inject(PagareReinscripcionesService);
  private snackBar = inject(MatSnackBar);

  @ViewChild("montoInput") montoInput!: ElementRef; //View de generación el segundo select oculto.

  // formIsVisible = false;
  public formIsVisible = signal(false);
  showMontoField: boolean = true;
  sliderValue : number = 1;
  idOperacion!: string | null;
  idGeneracion!: string | null;
  idRegistro: string | undefined;

  public myForm!: FormGroup;

  public get getFormControlArray() {
    return this.myForm.get("fechasPromesas") as FormArray;
  }

  ngAfterViewInit(): void {
    this.resetForm();
    this.addDate();
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
    console.log(this.myForm);
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
  public loadDataOnForm( { catalog: idOperacion, generation: idGeneracion }: SelectedPagareGeneracion) {
    this.idOperacion = idOperacion;
    this.idGeneracion = idGeneracion;

    // Limpiar formulario
    this.resetForm();
    this.formIsVisible.set(true);

    //Info que se mandara para consulta
    const extra: RequestOperationGen = {
      idOperacion: idOperacion ?? "",
      idGeneracion: idGeneracion ?? "",
    };

    this.idRegistro = undefined;
    //Set Monto
    this.Service.ConsultarCostoPromesas(extra).subscribe(
      (response: CostoPromesaResponse[]) => {
        console.log(response);
        if (response[0]) {
          console.log("Respuesta promesas", response);

          const { promesas, costo, idOperacion, id } = response[0];
          this.idOperacion = idOperacion;
          this.sliderValue = Number(promesas);
          this.idRegistro = id;
          this.myForm.patchValue({
            monto: Number(costo),
            cantidadPromesas: Number(promesas),
          });

          if (extra.idOperacion == "572") {
            const montoTemp = this.myForm.get("monto");
            montoTemp?.patchValue("0");
            montoTemp?.disable();

            this.showMontoField = false;
            console.log(this.montoInput);
          } else {
            this.showMontoField = true;
          }
        }
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
    let fechasConcat: string = "";
    const fechas = this.myForm.get("fechasPromesas")?.value;
    fechas.map((row: { date: Date | null }) => {
    console.log("l", row);
      fechasConcat = fechasConcat + this.Service.formatearFecha(row.date) + "|";
      return this.Service.formatearFecha(row.date);
    });

    fechasConcat = fechasConcat.slice(0, fechasConcat.length - 1);

    console.log(fechasConcat);

    this.myForm.patchValue({
      cantidadPromesas: this.sliderValue,
    });

    const monto: string = this.myForm.get("monto")?.value;

    let payload: RequestAltaPagare = {
      idOperacion: this.idOperacion ?? "",
      monto: monto,
      cantidadPromesas: this.sliderValue,
      fechasPromesas: fechasConcat,
      idGeneracion: this.idOperacion ?? "0",
    };

    if (this.idRegistro) {
      payload = {
        ...payload,
        idRegistro: this.idRegistro,
      };
    }

    console.log("Payload", payload);

    console.log(this.myForm.invalid);

    if (!this.myForm.invalid) {
      this.Service.PostAltaPagares(payload).subscribe((response) => {
        console.log(response);
        this.showSnackBar();
      });
    } else {
      this.showSnackBar(true);
    }
  }

  showSnackBar(error: boolean = false) {
    const config: {
      duration: number;
      data: { message: string; error: boolean };
    } = {
      data: {
        message: !error
          ? "Información guardada con exíto"
          : "Error: Información no guardada",
        error,
      },
      duration: 1800,
    };
    this.snackBar.openFromComponent(SnackBarComponent, config);
  }

  editWithInput(date:any, index: number){
    console.log('Info', date)
    this.getFormControlArray.get([index])?.patchValue(date.value)
  }
}

