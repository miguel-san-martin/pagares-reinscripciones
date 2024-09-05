import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioBase } from '../../../services/servicio-base.service';

@Injectable({
  providedIn: 'root',
})
export class EspecialityServicesAService extends ServicioBase {
  private httpClientB = inject(HttpClient);
  private apiUrl = 'http://localhost:3002';

  constructor() {
    super();
  }

  getAllEspecialities(): Observable<any> {
    return this.httpClientB.get<any>(`${this.apiUrl}/especiality`);
  }

  getAllStudents(): Observable<any> {
    return this.httpClientB.get<any>(`${this.apiUrl}/especiality/students`);
  }

  patchSpeciality(idiest: any, especiality: number) {
    const body = {
      idIest: idiest,
      esp: especiality,
    };
    return this.httpClientB.patch<any>(
      `http://localhost:3002/especiality/edit`,
      body,
    );
  }

  public getAlumnosIEST(): Observable<any> {
    const parametros = {
      servicio: 'pagaresMasivo',
      accion: 'CON_GeneracionPagares_Catalogos_Generaciones',
      tipoRespuesta: 'json',
    };
    return this.consulta(
      { ...parametros },
      '/api/contraloria/generaPagaresM.php',
    );
  }
}
