import { Injectable } from '@angular/core';
import { Cataloge } from '../../interfaces/devnull/catalogo';

@Injectable({
  providedIn: 'root'
})
export class MappingCatalogePeriodService {

  constructor() { }

/*   public CatalogResponsePeriod(array: Cataloge[]): any[] {
    if(array.length == 0) return []
    return array.map(({ id, descripcion }) => ({
      ...resto,
      idGrado: abrcarrera,
      abrCarrera: idgrado,
    }));
  }

  public AlumngoToAlumnoRequest(array: Alumno[]): AlumnoResponse[] {
    return array.map(({abrCarrera , idGrado, ...resto }) => ({
      ...resto,
      abrcarrera: abrCarrera ,
      idgrado: idGrado,
    }));
  }
   */

}
