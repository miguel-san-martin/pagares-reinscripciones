import { Injectable } from '@angular/core';
import { ServicioBase } from '../../../services/servicio-base.service';
import { Observable } from 'rxjs';
import {
  ResponseCatalogosConcurso,
  ResponsePeriods,
  ResponseTipos,
} from '../interfaces/grupoConcurso.interface';

@Injectable({
  providedIn: 'root',
})
export class GrupoconcursoService extends ServicioBase {
  constructor() {
    super();
  }

  public GetCatalogos(): Observable<ResponseCatalogosConcurso[]> {
    const parametros = {
      servicio: 'concursoBachillerato',
      accion: 'CUR_Bachillerato_Prepararte_Catalogos_Concurso',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros },
      '/api/alumnos/concursosBachillerato/concursoBachillerato.php',
    );
  }

  public GetPeriodos(): Observable<ResponsePeriods[]> {
    const parametros = {
      servicio: 'concursoBachillerato',
      accion: 'CUR_Bachillerato_Prepararte_Catalogos_Periodo',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros },
      '/api/alumnos/concursosBachillerato/concursoBachillerato.php',
    );
  }

  public GetTypes(): Observable<ResponseTipos[]> {
    const parametros = {
      servicio: 'concursoBachillerato',
      accion: 'CUR_Bachillerato_Prepararte_Catalogos_tipo',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros },
      '/api/alumnos/concursosBachillerato/concursoBachillerato.php',
    );
  }

  public GetListaEquipos(extras: { idConcurso: number; tipo: number }) {
    const parametros = {
      servicio: 'concursoBachillerato',
      accion: 'ListaEquipos',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/alumnos/concursosBachillerato/concursoBachillerato.php',
    );
  }

  public GetMembers(idEquipo: number = 0) {
    const parametros = {
      servicio: 'concursoBachillerato',
      accion: 'ListaAlumnosXEquipos',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, idEquipo },
      '/api/alumnos/concursosBachillerato/concursoBachillerato.php',
    );
  }
}
