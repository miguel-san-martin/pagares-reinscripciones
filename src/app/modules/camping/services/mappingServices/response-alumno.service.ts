import { Injectable } from '@angular/core';
import { Alumno } from '../../interfaces/devnull/Alumno';
import { AlumnoResponse } from '../../interfaces/responses/AlumnoResponse';

@Injectable({
  providedIn: 'root'
})
export class ResponseAlumnoService {

  constructor() { }

  public AlumnoResponseToAlumno(array: AlumnoResponse[]): Alumno[] {
    if(array.length == 0) return []
    return array.map(({ abrcarrera, idgrado, ...resto }) => ({
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

}
