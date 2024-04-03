import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MaterialModule } from '../../material-module/material.module';
import { Subscription } from 'rxjs';
import { PagareReinscripcionesService } from '../../services/pagare-reinscripciones.service';
import { TablaContraloriaComponent } from '../../shared/components/tabla-contraloria/tabla-contraloria.component';
import { Alumno } from '../../interfaces/Alumno';
import { FormsModule } from '@angular/forms';
import { ResponseAlumnoService } from '../../services/mappingServices/response-alumno.service';
import { Catalogo } from '../../interfaces/catalogo';
import { CommonModule } from '@angular/common';
import { GeneracionesResponse } from '../../interfaces/generaciones-response';
import { HEADTABLE } from './headTable';

@Component({
  standalone: true,
  imports: [MaterialModule, TablaContraloriaComponent, FormsModule,CommonModule],
  templateUrl: './generador-masivo.component.html',
  styleUrl: './generador-masivo.component.scss',
})
export class GeneradorMasivoComponent implements OnInit {

  Service = inject(PagareReinscripcionesService);
  Maping = inject(ResponseAlumnoService);


  @ViewChild('generacion') seleccionGeneracion!: ElementRef; //View de generacion el segundo select oculto.

  public progreso: number = 0; // Progreso de la barra

  public listaPagare!: Catalogo[]; //Lista de Catalogos
  public selectedCatalog!:string;// Valor del Select de Catalogos
  public listaGeneraciones: GeneracionesResponse[] = []; //Lista de Generaciones
  public selectedGeneracion: string | undefined;  //Valor del Select de Generacion que esta oculto.
  public data: Alumno[] = []; // Valores de la tabla
  public valoresQueRequierenGeneration = ['708', '798']

  public headTable = HEADTABLE;//Variable global



  public get porcentajeAvance(){
    if(!this.data) return 0
    return (this.progreso*100)/this.data.length
  }

  ngOnInit(): void {
    this.Service.GetPagaresCatalogosOperaciones().subscribe((response:Catalogo[]) => {
      console.log('response',response);
      this.listaPagare = response;
      const valorPorDefault = this.listaPagare[1].id
      this.selectedCatalog = valorPorDefault;
      this.actualizarTabla({value: valorPorDefault},'0')
    });

    this.Service.GetCatalogosGeneraciones().subscribe(
      (response) => {
        this.listaGeneraciones = response;
      }

    )
  }

  actualizarTabla(event:any, generacion:string = '0'){
    let gen = '0'
    if((event.value == '798' || event.value == '708' )) {
      this.selectedGeneracion = generacion
      gen = generacion;
    }else{
      console.log('El valor se ha restablecido');
      this.selectedGeneracion = undefined;
    }

/*     console.log(event.value);
    console.log('elemento',this.seleccionGeneracion); */

    this.displaySubSelect(event.value);
    this.Service.GetAlumnosConsiderados({
      idOperacion: event.value,
      idGeneracion: gen,
    }).subscribe((response) => {
      this.data = this.Maping.AlumnoResponseToAlumno(response);
      //console.log(this.data);
    });
    this.progreso = 0;
  }



  // Si es un pagare tipo Impulsa - 798 o 708 Vertice se mostrara un select con #genereacion como referencia
  displaySubSelect(id:string){
    if(id == '798' || id == '708'){
      this.seleccionGeneracion.nativeElement.style.display = 'contents';
    }else{
      this.seleccionGeneracion.nativeElement.style.display = 'none';
    }
  }


   // Parte de place holder
   //! TO DO::
  private suscription!: Subscription;

  simularBarra() {
    this.suscription?.unsubscribe;
    if (this.suscription?.closed !== false) {

      this.suscription = this.Service.startTiemer(this.data.length).subscribe((value) => {
        this.progreso = value;
        console.log(this.progreso);
      });
    }
  }
}
