import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioBase } from './servicio-base.service';
import {
  Alumnos,
  Grados,
  togasPorFechaRequest,
} from '../interfaces/togas.interface';

@Injectable({
  providedIn: 'root',
})
export class PagareServiceService extends ServicioBase {
  constructor() {
    super();
  }

  /**
   * Entrada de objetos tipo Date, salen de ellos AñoMesDia en formato string
   *
   * @param {(Date | undefined | null)} fecha
   * @return {string}
   * @memberof PagareServiceService
   */
  formatearFecha(fecha: Date | undefined | null): string {
    if (!fecha) return 'no hay fecha';
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear().toString();
    return `${año}${mes}${dia}`;
  }

  generarUrlRPT(
    grado: string,
    idAlumno: string = '0',
    caja: string = '0',
    inicio: string = '19000101',
    fin: string = '19000101',
  ): string {
    const reporteador = 'RPT_Pagare_Togasv2.rpt';
    const enlace = `https://reportes.iest.edu.mx/app/reportes/Convert/Default.aspx?prompt0=${idAlumno}&prompt1=${grado}&prompt2=${caja}&prompt3=${inicio}&prompt4=${fin}&prompt5=5030&reporte=${reporteador}`;

    return enlace;
  }

  //Catalogo para el Buscador 25 (Creación del evento)
  public PER_BuscadoresPersonas(
    extras: { indicador: string }, // envia un carcacter numero o nombre
    //PER_BuscadoresPersonas,
  ): Observable<Alumnos[]> {
    const parametros = {
      servicio: 'toga',
      accion: 'buscador',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/consultaToga.php',
    );
  }

  /**
   *  Consulta un listado de alumnos que han pagado, recibe una fecha
   *  inicio y fin mas paramestros nomrales y regresa un observable de alumnos
   * @param {togasPorFechaRequest} extras
   * @return {Observable<Alumnos[]>}
   * @memberof PagareServiceService
   */
  public PER_BuscadoresPersonasPorFecha(
    extras: togasPorFechaRequest,
  ): Observable<any> {
    const parametros = {
      servicio: 'toga',
      accion: 'CON_ConsultaPagareToga_Listado',
      tipoRespuesta: 'json',
    };

    //return of(RESP_TEMP)

    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/consultaToga.php',
    );
  }

  /**
   * Consulta de grados toga devuelve los grados con su id
   *
   * @return {Observable<Grados[]>}
   * @memberof PagareServiceService
   */
  public TOGA_Consulta_Grados(): Observable<Grados[]> {
    const parametros = {
      servicio: 'toga',
      accion: 'CON_ConsultaPagareToga_Grados',
      tipoRespuesta: 'json',
    };

    return this.consulta(
      { ...parametros },
      '/api/contraloria/consultaToga.php',
    );
  }

  /**
   * Consulta de grados toga devuelve los grados con su id
   *
   * @return {Observable<Grados[]>}
   * @memberof PagareServiceService
   */
  public TOGA_Consulta_Valido(extras: {
    idAlumno: string;
    idIest: string;
  }): Observable<any> {
    const parametros = {
      servicio: 'toga',
      accion: 'CON_ConsultaPagareToga_Valida',
      tipoRespuesta: 'json',
    };

    return this.consulta(
      { ...parametros, ...extras },
      '/api/contraloria/consultaToga.php',
    );
  }
}
