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
  //fechasPromesas!: FormArray;
  sliderValue = 1;

  public myForm!: FormGroup;

  get promesasControl() {
    return (this.myForm.get('fechasPromesas') as FormArray).controls;
  }

  createArray(length: number) {
    return new Array(length);
  }

  ngOnInit(): void {
/*     this.Service.GetPagaresCatalogosOperaciones().subscribe(
      (response: Catalogo[]) => {
        console.log('response', response);
        this.listaPagare = response;
        //const valorPorDefault = this.listaPagare[1].id
        // this.selectedCatalog = valorPorDefault;
        // this.cargarFormulario({value: valorPorDefault})
      },
    ); */

    this.myForm = this.FB.group({
      idOperacion: [this.selectedCatalog],
      monto: [10000,Validators.required],
      cantidadPromesas: [this.sliderValue],
      fechasPromesas: this.FB.array([]),
    });
    if(this.sliderValue == 1) this.addDate();
  }

  addDate() {
    const arreglo = this.myForm.get('fechasPromesas') as FormArray
    const grupo = this.FB.group({
      date: [null,Validators.required]
    })
    arreglo.push(grupo)
    console.log('Añadido');
    
  }

  removeDate(){
    const arreglo = this.myForm.get('fechasPromesas') as FormArray
    arreglo.removeAt(this.sliderValue)
    console.log('Removido');
  }


  //Metodo que se ejecuta cuando detecta un cambio en la barra
  cambio() {
    const size = this.promesasControl.length;
    console.log('barra', this.sliderValue, 'forms', size);

    if (size < this.sliderValue) {
      while (this.promesasControl.length < this.sliderValue) {
        this.addDate()
      }
    } else {
      while (this.promesasControl.length > this.sliderValue) {
        this.removeDate()
      }
    }
  }

  // Funcion que se ejecuta tras seleccionar un elemento en el select
  cargarFormulario(id: string) {

    const catalogo = this.listaPagare.filter((obj) => {
      return obj.id === id;
    });
    console.log(catalogo[0].descripcion);

    //throw new Error('Method not implemented.');
  }


  // Metodo que se ejecuta con el onsumit
  onSave() {
    this.myForm.patchValue({
      cantidadPromesas: this.sliderValue,
    });
    console.log(this.myForm.value);
  }
}
