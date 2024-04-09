import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../material-module/material.module';
import { TablaContraloriaComponent } from '../../shared/components/tabla-contraloria/tabla-contraloria.component';
import { PagareReinscripcionesService } from '../../services/pagare-reinscripciones.service';
import { Catalogo } from '../../interfaces/catalogo';
import { MatNativeDateModule } from '@angular/material/core';
import { RequestAltaPagare } from '../../interfaces/request/request-alta-pagare';
import { CostoPromesaResponse } from '../../interfaces/responses/costo-promesas.interface';
import { SelectPagaresGeneracionComponent } from '../../components/select-pagares-generacion/select-pagares-generacion.component';
import { SelectedPagareGeneracion } from '../../interfaces/selected-pagare-generacion';
import { ConsultaFecha } from '../../interfaces/responses/consulta-fecha';

@Component({
  standalone: true,
  imports: [
    MaterialModule,
    SelectPagaresGeneracionComponent,
    TablaContraloriaComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  templateUrl: './configuracion-generacion.component.html',
  styleUrl: './configuracion-generacion.component.scss',
})

export class ConfiguracionGeneracionComponent implements OnInit {
  FB = inject(FormBuilder);
  Service = inject(PagareReinscripcionesService);

  idOperacion: any = 0;
  sliderValue = 8;

  public myForm!: FormGroup;

  get promesasControl() {
    return (this.myForm.get('fechasPromesas') as FormArray).controls;
  }

  createArray(length: number) {
    return new Array(length);
  }

  ngOnInit(): void {
    this.myForm = this.FB.group({
      idOperacion: [this.idOperacion],
      monto: [10000, Validators.required],
      cantidadPromesas: [this.sliderValue],
      fechasPromesas: this.FB.array([]),
    });

    if (this.sliderValue == 1) this.addDate();
  }

  addDate(date: any | null = null) {
    const arreglo = this.myForm.get('fechasPromesas') as FormArray;
    const grupo = this.FB.group({
      date: [date, Validators.required],
    });
    arreglo.push(grupo);
    //console.log('Añadido');
  }

  removeDate() {
    const arreglo = this.myForm.get('fechasPromesas') as FormArray;
    arreglo.removeAt(this.sliderValue);
    //console.log('Removido');
  }

  //Metodo que se ejecuta cuando detecta un detectSliderChange en la barra
  detectSliderChange() {
    const size = this.promesasControl.length;
    //console.log('barra', this.sliderValue, 'forms', size);
    if (size < this.sliderValue) {
      while (this.promesasControl.length < this.sliderValue) {
        this.addDate();
      }
    } else {
      while (this.promesasControl.length > this.sliderValue) {
        this.removeDate();
      }
    }
  }

  // Funcion que se ejecuta tras seleccionar un elemento en el select
  cargarFormulario(selected: SelectedPagareGeneracion) {
    this.myForm = this.FB.group({
      idOperacion: [this.idOperacion],
      monto: [10000, Validators.required],
      cantidadPromesas: [1],
      fechasPromesas: this.FB.array([]),
    });

    //Set Promesas
    this.idOperacion = selected.catalog;
    this.myForm.get('cantidadPromesas')?.patchValue(selected.catalog)


    //Set Monto
    this.Service.ConsultarCostoPromesas({
      idOperacion: selected.catalog,
      idGeneracion: selected.generation.toString(),
    }).subscribe((response: CostoPromesaResponse[]) => {
      const promesas = response[0];
      this.sliderValue = Number(promesas.promesas);
      this.myForm.patchValue({
        monto: Number(promesas.costo),
      });
    });

    let fechasDate: Date[] = [];
    this.Service.ConsultarFechasPromesas({
      idOperacion: selected.catalog,
      idGeneracion: selected.generation.toString(),
    }).subscribe((response: ConsultaFecha[]) => {
      const mapa = response;
      mapa.map((m) => {
        fechasDate.push(new Date(m.FechaVencimiento));
      });

      this.createDates(fechasDate);

      console.log(this.myForm.value);

      //this.setTime(fechasDate);
    });
  }
  createDates(fechasDate: Date[]) {
    const fechasPromesasArray = this.myForm.get('fechasPromesas') as FormArray;
    fechasPromesasArray.setValue([]);
    fechasDate.forEach((r) => {
      this.addDate(r);
    });
  }
  // Metodo que se ejecuta con el onsumit
  onSave() {
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
    const envio: RequestAltaPagare = {
      idOperacion: this.idOperacion,
      cantidadPromesas: this.sliderValue.toString(),
      monto: monto,
      fechasPromesas: fechasConcat,
      idGeneracion: '0',
    };

    this.Service.PostAltaPagares(envio).subscribe((response) => {
      console.log(response);
    });
  }
}
