import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Alumno } from '../../../../interfaces/Alumno';
import { RequestOperationGen } from '../../../../interfaces/request/request-operation-gen';
import { AlumnoResponse } from '../../../../interfaces/responses/AlumnoResponse';
import { ConsultaFecha } from '../../../../interfaces/responses/consulta-fecha';
import { CostoPromesaResponse } from '../../../../interfaces/responses/costo-promesas.interface';
import { SelectedPagareGeneracion } from '../../../../interfaces/selected-pagare-generacion';
import { ResponseAlumnoService } from '../../../../services/mappingServices/response-alumno.service';
import { PagareReinscripcionesService } from '../../services/pagare-reinscripciones.service';
import { HEADTABLE } from './headTable';

@Component({
  templateUrl: './generador-masivo.component.html',
  styleUrl: '../../../../shared/scss/custom-template-miguel-v2.scss',
})

export class GeneradorMasivoComponent implements OnInit {
  Service = inject(PagareReinscripcionesService);
  Maping = inject(ResponseAlumnoService);

  @ViewChild('generacion') seleccionGeneracion!: ElementRef; //View de generacion el segundo select oculto.

  public loaderBarProgress: number = 0; // Progreso de la barra.
  public data: Alumno[] | undefined = undefined; // Valores de la tabla.
  public headTable = HEADTABLE; //Variable global.

  private fechas: ConsultaFecha[] = [];

  public infoBar = {
    costo: '',
    promesas: '',
    fechas: this.fechas,
    msj: ''
  };

  ngOnInit(): void {}

  /**
   *  Actualiza el cuadro recibe el idOperacion y idGeneracion
   *
   * @param {SelectedPagareGeneracion} selected
   * @memberof GeneradorMasivoComponent
   */
  public actualizarInfoBar({catalog: idOperacion, generation: idGeneracion}: SelectedPagareGeneracion) {

    const extra: RequestOperationGen = {
      idOperacion: idOperacion,
      idGeneracion: idGeneracion
    }
    //Consulta Validacion Promesas
    this.Service.ConsultarValidacionPromesas(extra).subscribe((response) => {
      this.infoBar.msj = response[0].msj;
    });

    //Consulta del Costo de las promesas y numero de promesas
    this.Service.ConsultarCostoPromesas(extra).subscribe((response: CostoPromesaResponse[]) => {
      if (response.length > 0) {
        const { costo, promesas } = response[0];
        this.infoBar.costo = costo;
        this.infoBar.promesas = promesas;
      } else {
        this.restablecerInfoBar()
      }
    });

    //Consulta de las fechas de la promesas
    this.Service.ConsultarFechasPromesas(extra).subscribe((response: ConsultaFecha[]) => {
      console.log('fecha', response);
      if (response.length > 0) {
        this.infoBar.fechas = response;
      } else {
        this.restablecerInfoBar()
      }
    });
  }

  /**
   *  Limpia la infoBar a un estado por default
   *
   * @memberof GeneradorMasivoComponent
   */
  private restablecerInfoBar(){
    this.infoBar = {
      costo : '',
      fechas : [],
      msj : 'Seleccione una generacion',
      promesas : ''
    }
  }

  public actualizarTabla({catalog: idOperacion, generation: idGeneracion}: SelectedPagareGeneracion) {
    const extra: RequestOperationGen = {
      idOperacion: idOperacion,
      idGeneracion: idGeneracion
    }
    this.Service.GetAlumnosConsiderados(extra).subscribe((response:AlumnoResponse[]) => {
      this.data = this.Maping.AlumnoResponseToAlumno(response); //Aqui mapeo la respuesta a la mia
      //console.log(this.data);
    });
    this.actualizarInfoBar({catalog: idOperacion, generation: idGeneracion});
    this.loaderBarProgress = 0;
  }


  // Parte de place holder
  //! TO DO::
  private suscription!: Subscription;

  public get porcentajeAvance() {
    if (!this.data) return 0;
    return (this.loaderBarProgress * 100) / this.data.length;
  }

  public simularBarra() {
    this.suscription?.unsubscribe;
    if (this.suscription?.closed !== false) {
      this.suscription = this.Service.startTiemer(
        this.data?.length || 0,
      ).subscribe((value) => {
        this.loaderBarProgress = value;
        console.log(this.loaderBarProgress);
      });
    }
  }

}
