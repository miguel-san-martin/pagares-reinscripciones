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
import { ConsultaFecha } from '../../interfaces/responses/consulta-fecha';

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
  public data: Alumno[] | undefined = undefined; // Valores de la tabla
  public headTable = HEADTABLE; //Variable global

  fechas: ConsultaFecha[] = [];

  infoBar = {
    costo: '',
    promesas: '',
    fechas: this.fechas,
    msj: '',
  };

  ngOnInit(): void {}

  actualizarAlert(selected: SelectedPagareGeneracion) {

    this.Service.ConsultarValidacionPromesas({
      idOperacion: selected.catalog,
      idGeneracion: selected.generation.toString(),
    }).subscribe((response) => {
      this.infoBar.msj = response[0].msj;
    });

    this.Service.ConsultarCostoPromesas({
      idOperacion: selected.catalog,
      idGeneracion: selected.generation.toString(),
    }).subscribe((response: CostoPromesaResponse[]) => {
      //console.log('Datos pagare', response[0].costo);
      if (response.length > 0) {
        const { costo, promesas } = response[0];
        this.infoBar.costo = costo;
        this.infoBar.promesas = promesas;
      } else {
        this.infoBar.costo = '';
        this.infoBar.promesas = '';
        this.infoBar.fechas = [];
        this.infoBar.msj = 'Seleccione una generacion';
      }
    });

    this.Service.ConsultarFechasPromesas({
      idOperacion: selected.catalog,
      idGeneracion: selected.generation.toString(),
    }).subscribe((response: ConsultaFecha[]) => {
      console.log('fecha', response);
      if (response.length > 0) {
        this.infoBar.fechas = response;
      } else {
        this.infoBar.costo = '';
        this.infoBar.promesas = '';
        this.infoBar.fechas = [];
        this.infoBar.msj = 'Seleccione una generacion';
      }
    });
  }

  actualizarTabla(selected: SelectedPagareGeneracion) {
    this.Service.GetAlumnosConsiderados({
      idOperacion: selected.catalog,
      idGeneracion: selected.generation.toString(),
    }).subscribe((response) => {
      this.data = this.Maping.AlumnoResponseToAlumno(response); //Aqui mapeo la respuesta a la mia
      //console.log(this.data);
    });
    this.actualizarAlert(selected);
    this.progreso = 0;
  }

  // Parte de place holder
  //! TO DO::
  private suscription!: Subscription;

  public get porcentajeAvance() {
    if (!this.data) return 0;
    return (this.progreso * 100) / this.data.length;
  }

  public simularBarra() {
    this.suscription?.unsubscribe;
    if (this.suscription?.closed !== false) {
      this.suscription = this.Service.startTiemer(
        this.data?.length || 0,
      ).subscribe((value) => {
        this.progreso = value;
        console.log(this.progreso);
      });
    }
  }
}
