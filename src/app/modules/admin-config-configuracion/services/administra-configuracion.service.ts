import { Injectable } from '@angular/core';
import { ServicioBase } from "../../camping/services/servicio-base.service";
import { Observable } from "rxjs";
import { ResponseEditabilityPeriode } from "../../camping/interfaces/responses/response-editability-periode";

@Injectable({
  providedIn: 'root'
})
export class AdministraConfiguracionService extends ServicioBase {
  constructor() {
    super();
  }

  public getListHorarios(
    // envia un character numero o nombre
  ): Observable<any> {
    const parametros = {
      servicio: 'horariosYexamenes',
      accion: 'listadoParametros',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros }, '/api/escolares/administraConfiguracion.php');
  }
  public patchListHorarios(
    idParametro:number
    // envia un character numero o nombre
  ): Observable<any> {
    const parametros = {
      servicio: 'horariosYexamenes',
      accion: 'cambiaParametro',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idParametro }, '/api/escolares/administraConfiguracion.php');
  }

}
