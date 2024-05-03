import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, takeWhile } from 'rxjs';

import { ServicioBase } from '../servicio-base.service';

import { PER_BuscadoresPersonas } from '../../models/parametros-api/PER_BuscadoresPersonas.model';
import { Buscador25 } from '../../models/Buscador25.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService extends ServicioBase {
  constructor(private router: Router) {
    super();
  }


  //Catalogo para el Buscador 25 (Creación del evento)
  public PER_BuscadoresPersonas(
    extras: PER_BuscadoresPersonas,
  ): Observable<Buscador25[]> {
    const parametros = {
      servicio: 'buscador',
      accion: 'PER_BuscadoresPersonas',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros, ...extras },
      '/api/Buscador/buscador.php',
    );
  }

}
