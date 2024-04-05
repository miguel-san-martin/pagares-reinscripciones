import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
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
import { SelectPagaresGeneracionComponent } from '../../components/select-pagares-generacion/select-pagares-generacion.component';
import { SelectedPagareGeneracion } from '../../interfaces/selected-pagare-generacion';
import { CostoPromesaResponse } from '../../interfaces/responses/costo-promesas.interface';

@Component({
  standalone: true,
  imports: [
    MaterialModule,
    TablaContraloriaComponent,
    FormsModule,
    CommonModule,
    SelectPagaresGeneracionComponent,
  ],
  templateUrl: './generador-masivo.component.html',
  styleUrl: './generador-masivo.component.scss',
})
export class GeneradorMasivoComponent implements OnInit {
  Service = inject(PagareReinscripcionesService);
  Maping = inject(ResponseAlumnoService);

  @ViewChild('generacion') seleccionGeneracion!: ElementRef; //View de generacion el segundo select oculto.

  public progreso: number = 0; // Progreso de la barra
  public data: Alumno[] | undefined= undefined; // Valores de la tabla
  public headTable = HEADTABLE; //Variable global


  costo = ''
  promesas = ''
  fechas = ''

  ngOnInit(): void {


  }

  actualizarTabla(selected: SelectedPagareGeneracion) {
    this.Service.GetAlumnosConsiderados({
      idOperacion: selected.catalog,
      idGeneracion: selected.generation.toString(),
    }).subscribe((response) => {
      this.data = this.Maping.AlumnoResponseToAlumno(response); //Aqui mapeo la respuesta a la mia
      //console.log(this.data);
    });
    this.progreso = 0;

    this.Service.ConsultarCostoPromesas({idOperacion: selected.catalog, idGeneracion: '0'}).subscribe(
      (response:CostoPromesaResponse[]) => {
        console.log('Datos pagare',response[0].costo);
        const {costo, promesas} = response[0];
      }
    )

  }

  // Parte de place holder
  //! TO DO::
  private suscription!: Subscription;

  public get porcentajeAvance() {
    if (!this.data) return 0;
    return (this.progreso * 100) / this.data.length;
  }

  public  simularBarra() {
    this.suscription?.unsubscribe;
    if (this.suscription?.closed !== false) {
      this.suscription = this.Service.startTiemer(this.data?.length || 0).subscribe(
        (value) => {
          this.progreso = value;
          console.log(this.progreso);
        },
      );
    }
  }
}
