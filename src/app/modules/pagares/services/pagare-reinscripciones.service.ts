import { Injectable, inject } from '@angular/core';
import {
  interval,
  startWith,
  tap,
  map,
  takeWhile,
  take,
  Observable,
} from 'rxjs';
import { ServicioBase } from '../../../services/servicio-base.service';
import { Catalogo } from '../../../interfaces/catalogo';
import { ResponseAlumnoService } from '../../../services/mappingServices/response-alumno.service';
import { AlumnoResponse } from '../../../interfaces/responses/AlumnoResponse';
import { GeneracionesResponse } from '../../../interfaces/generaciones-response';
import { RequestAltaPagare } from '../../../interfaces/request/request-alta-pagare';
import { CostoPromesaResponse } from '../../../interfaces/responses/costo-promesas.interface';
import { ConsultaFecha } from '../../../interfaces/responses/consulta-fecha';
import { SelectedPagareGeneracion } from '../../../interfaces/selected-pagare-generacion';
import { RequestOperationGen } from '../../../interfaces/request/request-operation-gen';

@Injectable({
  providedIn: 'root',
})
export class PagareReinscripcionesService extends ServicioBase {
  constructor() {
    super();
  }

  startTiemer(lenght: number) {
    const observable = interval(1000).pipe(
      // Empezar desde 10
      take(lenght),
      // Incrementar el valor en 10 cada vez que se emita un valor
      map((value) => value + 1),
      tap(() => {
        console.log;
      }),
      // Tomar solo los valores hasta llegar a 100
      takeWhile((value) => value <= lenght),
    );

    return observable;
  }

  public GetCatalogosOperaciones(
    extras: { indicador: string } = { indicador: '' }, // envia un carcacter numero o nombre
    //PER_BuscadoresPersonas,
  ): Observable<Catalogo[]> {
    const parametros = {
      servicio: 'pagaresMasivo',
      accion: 'CON_GeneracionPagares_Catalogos_Operaciones',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/generaPagaresM.php',
    );
  }

  public GetCatalogosGeneraciones(
    extras: { indicador: string } = { indicador: '' }, // envia un carcacter numero o nombre
    //PER_BuscadoresPersonas,
  ): Observable<GeneracionesResponse[]> {
    const parametros = {
      servicio: 'pagaresMasivo',
      accion: 'CON_GeneracionPagares_Catalogos_Generaciones',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/generaPagaresM.php',
    );
  }

  public GetAlumnosConsiderados(
    extras: { idOperacion: string; idGeneracion: string }, // envia un carcacter numero o nombre
    //PER_BuscadoresPersonas,
  ): Observable<AlumnoResponse[]> {
    const parametros = {
      servicio: 'pagaresMasivo',
      accion: 'CON_GeneracionPagares_Acciones_Consulta',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/generaPagaresM.php',
    );
  }

  /**
   * Entrada de objetos tipo Date, salen de ellos DD-Mes-AA en formato string 01-ene-29
   *
   * @param {(Date | undefined | null)} fecha
   * @return {string}
   * @memberof PagareServiceService
   */
  public formatearFecha(fecha: Date | undefined | null): string {
    if (!fecha) return 'no hay fecha';
    const dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let año = fecha.getFullYear().toString().slice(2);

    switch (mes) {
      case '01':
        mes = 'ene';
        break;
      case '02':
        mes = 'feb';
        break;
      case '03':
        mes = 'mar';
        break;
      case '04':
        mes = 'abr';
        break;
      case '05':
        mes = 'may';
        break;
      case '06':
        mes = 'jun';
        break;
      case '07':
        mes = 'jul';
        break;
      case '08':
        mes = 'ago';
        break;
      case '09':
        mes = 'sep';
        break;
      case '10':
        mes = 'oct';
        break;
      case '11':
        mes = 'nov';
        break;
      case '12':
        mes = 'dic';
        break;
    }

    return `${dia}-${mes}-${año}`;
  }

  public formatearStringAFecha(fechas: string[]) {}

  public PostAltaPagares(
    extras: RequestAltaPagare, // envia un carcacter numero o nombre
    //PER_BuscadoresPersonas,
  ): Observable<any> {
    let parametros;
    console.log('log', extras.idRegistro);

    if (extras.idRegistro === undefined) {
      parametros = {
        servicio: 'pagaresMasivo',
        accion: 'CON_GeneracionPagares_Administracion_Alta',
        tipoRespuesta: 'json',
      };
    } else {
      parametros = {
        servicio: 'pagaresMasivo',
        accion: 'CON_GeneracionPagares_ActualizaCostos_Fechas',
        tipoRespuesta: 'json',
      };
    }

    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/generaPagaresM.php',
    );
  }

  public ConsultarCostoPromesas(
    extras: { idOperacion: string; idGeneracion: string }, // envia un carcacter numero o nombre
    //PER_BuscadoresPersonas,
  ): Observable<CostoPromesaResponse[]> {
    const parametros = {
      servicio: 'pagaresMasivo',
      accion: 'CON_GeneracionPagares_Administracion_Consulta',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/generaPagaresM.php',
    );
  }

  public ConsultarFechasPromesas(
    extras: RequestOperationGen, // envia un carcacter numero o nombre
    //PER_BuscadoresPersonas,
  ): Observable<ConsultaFecha[]> {
    const parametros = {
      servicio: 'pagaresMasivo',
      accion: 'CON_GeneracionPagares_Administracion_ConsultaFecha',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/generaPagaresM.php',
    );
  }

  /**
   *  Indica si existen o no datos capturados sobre costos y plazo set
   *
   * @param {{idOperacion:string}} extras
   * @return {Observable<ConsultaFecha[]>}
   * @memberof PagareReinscripcionesService
   */
  public ConsultarValidacionPromesas(
    extras: RequestOperationGen, // envia un carcacter numero o nombre
    //PER_BuscadoresPersonas,
  ): Observable<any[]> {
    const parametros = {
      servicio: 'pagaresMasivo',
      accion: 'CON_GeneracionPagares_Administracion_Validacion',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/generaPagaresM.php',
    );
  }
}
