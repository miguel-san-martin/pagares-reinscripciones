import { Injectable, inject } from '@angular/core';
import { interval, startWith, tap, map, takeWhile, take, Observable } from 'rxjs';
import { ServicioBase } from './servicio-base.service';
import { Catalogo } from '../interfaces/catalogo';
import { ResponseAlumnoService } from './mappingServices/response-alumno.service';
import { AlumnoResponse } from '../interfaces/responses/AlumnoResponse';
import { GeneracionesResponse } from '../interfaces/generaciones-response';

@Injectable({
  providedIn: 'root'
})
export class PagareReinscripcionesService extends ServicioBase {

  constructor() {
    super();
  }

  startTiemer(lenght:number){
    const observable = interval(1000).pipe(
      // Empezar desde 10
      take(lenght),
      // Incrementar el valor en 10 cada vez que se emita un valor
      map(value => (value + 1)),
      tap( () => {console.log} ),
      // Tomar solo los valores hasta llegar a 100
      takeWhile(value => value <= lenght)
    );

    return observable;
  }

    public GetPagaresCatalogosOperaciones(
      extras: { indicador: string  } = {indicador: ''}, // envia un carcacter numero o nombre
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
      extras: { indicador: string  } = {indicador: ''}, // envia un carcacter numero o nombre
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
      extras: { idOperacion: string, idGeneracion: string}, // envia un carcacter numero o nombre
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

}
