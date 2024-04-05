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

@Component({
  standalone: true,
  imports: [
    MaterialModule,
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

  selectedCatalog: any = 0;
  listaPagare: Catalogo[] = [];
  sliderValue = 1;

  public myForm!: FormGroup;

  get promesasControl() {
    return (this.myForm.get('fechasPromesas') as FormArray).controls;
  }

  createArray(length: number) {
    return new Array(length);
  }

  ngOnInit(): void {
    this.Service.GetPagaresCatalogosOperaciones().subscribe(
      (response: Catalogo[]) => {
        console.log('response', response);
        this.listaPagare = response;
        //const valorPorDefault = this.listaPagare[1].id
        // this.selectedCatalog = valorPorDefault;
        // this.cargarFormulario({value: valorPorDefault})
      },
    );

    this.myForm = this.FB.group({
      idOperacion: [this.selectedCatalog],
      monto: [10000, Validators.required],
      cantidadPromesas: [this.sliderValue],
      fechasPromesas: this.FB.array([]),
    });
    if (this.sliderValue == 1) this.addDate();
  }

  addDate() {
    const arreglo = this.myForm.get('fechasPromesas') as FormArray;
    const grupo = this.FB.group({
      date: [null, Validators.required],
    });
    arreglo.push(grupo);
    console.log('Añadido');
  }

  removeDate() {
    const arreglo = this.myForm.get('fechasPromesas') as FormArray;
    arreglo.removeAt(this.sliderValue);
    console.log('Removido');
  }

  //Metodo que se ejecuta cuando detecta un cambio en la barra
  cambio() {
    const size = this.promesasControl.length;
    console.log('barra', this.sliderValue, 'forms', size);

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
  cargarFormulario(id: string) {
    const catalogo = this.listaPagare.filter((obj) => {
      return obj.id === id;
    });

    this.Service.ConsultaPagares({idOperacion: id}).subscribe(
      (response) => {
        console.log(response);

      }
    )


  }

  // Metodo que se ejecuta con el onsumit
  onSave() {
    let fechasConcat: string = '';
    let fechas = this.myForm.get('fechasPromesas')?.value;
    fechas = fechas.map((row: any) => {
      fechasConcat = fechasConcat + this.Service.formatearFecha(row.date) + '|';
      return this.Service.formatearFecha(row.date);
    });

    console.log(fechasConcat);

    this.myForm.patchValue({
      cantidadPromesas: this.sliderValue,
    });
    //console.log(this.myForm.value);
    const monto = this.myForm.get('monto')?.value;
    const envio: RequestAltaPagare = {
      idOperacion: this.selectedCatalog,
      cantidadPromesas: '' + this.sliderValue,
      monto: '' + monto,
      fechasPromesas: fechasConcat,
      idGeneracion: '0'
    };
    this.Service.PostAltaPagares(envio).subscribe((response) => {
      console.log(response);
    });
  }
}
