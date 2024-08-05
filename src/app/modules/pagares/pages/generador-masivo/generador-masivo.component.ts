import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
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
import { ExcelService } from '../../services/excel.service';

@Component({
  templateUrl: './generador-masivo.component.html',
  styleUrl: '../../../../shared/scss/custom-template-miguel-v2.scss',
})
export class GeneradorMasivoComponent implements OnDestroy {
  Service = inject(PagareReinscripcionesService);
  Maping = inject(ResponseAlumnoService);
  Excel = inject(ExcelService);

  @ViewChild('generacion') seleccionGeneracion!: ElementRef; //View de generación el segundo select oculto.

  readonly fechas: ConsultaFecha[] = [];
  public infoBar = {
    costo: '',
    promesas: '',
    fechas: this.fechas,
    msj: '',
  };
  public loaderBarProgress: number = 0; // Progreso de la barra.
  public data: Alumno[] = []; // Valores de la tabla.
  public headTable = HEADTABLE; //Variable global.
  public disableGenerateButton: boolean = false;
  public subscriptions: Subscription[] = [];

  readonly showPanel = signal<boolean>(false);

  /**
   *  Actualiza el cuadro recibe el idOperacion y idGeneracion
   *
   * @param {SelectedPagareGeneracion} selected
   * @memberof GeneradorMasivoComponent
   */
  public actualizarInfoBar({
    catalog: idOperacion,
    generation: idGeneracion,
  }: SelectedPagareGeneracion) {
    const extra: RequestOperationGen = {
      idOperacion: idOperacion ?? '',
      idGeneracion: idGeneracion ?? '',
    };
    //Consulta Validacion Promesas
    this.subscriptions.push(
      this.Service.ConsultarValidacionPromesas(extra).subscribe((response) => {
        this.infoBar.msj = response[0].msj;
        if (response[0].error == 1) {
          this.disableGenerateButton = true;
        } else {
          this.disableGenerateButton = false;
        }
      }),
    );

    //Consulta del Costo de las promesas y número de promesas
    this.subscriptions.push(
      this.Service.ConsultarCostoPromesas(extra).subscribe(
        (response: CostoPromesaResponse[]) => {
          if (response.length > 0) {
            const { costo, promesas } = response[0];
            this.infoBar.costo = costo;
            this.infoBar.promesas = promesas;
          } else {
            this.restablecerInfoBar();
          }
        },
      ),
    );

    //Consulta de las fechas de las promesas.
    this.subscriptions.push(
      this.Service.ConsultarFechasPromesas(extra).subscribe(
        (response: ConsultaFecha[]) => {
          if (response.length > 0) {
            this.infoBar.fechas = response;
          } else {
            this.restablecerInfoBar();
          }
        },
      ),
    );
  }

  /**
   *  Limpia la infoBar a un estado por default
   *
   * @memberof GeneradorMasivoComponent
   */
  private restablecerInfoBar() {
    this.infoBar = {
      costo: '',
      promesas: '',
      fechas: [],
      msj: 'Seleccione una generacion',
    };
  }

  public actualizarTabla({
    catalog: idOperacion,
    generation: idGeneracion,
  }: SelectedPagareGeneracion) {
    const extra: RequestOperationGen = {
      idOperacion: idOperacion ?? '',
      idGeneracion: idGeneracion ?? '',
    };
    this.subscriptions.push(
      this.Service.GetAlumnosConsiderados(extra).subscribe(
        (response: AlumnoResponse[]) => {
          this.data = this.Maping.AlumnoResponseToAlumno(response); //Aqui mapeo la respuesta a la mia
          //console.log(this.data);
          this.showPanel.set(true);
        },
        () => {
          this.showPanel.set(false);
        },
      ),
    );
    this.actualizarInfoBar({ catalog: idOperacion, generation: idGeneracion });
    this.loaderBarProgress = 0;
  }

  hiddenPanel(signal: boolean) {
    if (!signal) {
      this.restablecerInfoBar();
      this.data = [];
    }
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
      });
    }
  }

  ngOnDestroy(): void {
    let subs: number = 0;
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
      subs++;
    });
    console.log(subs, 'borrados');
  }

  generateExcel() {
    this.Excel.generateExcel(this.data, new Date().toISOString());
  }
}
