import { Injectable } from '@angular/core';
import { ServicioBase } from './servicio-base.service';
import { Observable } from 'rxjs';
import { SelectedCatalog } from '../interfaces/selected-catalog';
import { ResponseGetFee} from '../interfaces/responses/response-get-fee';
import { ResponseExtraFee } from '../interfaces/responses/response-extra-fee';
import { ResponseIdDescont } from '../interfaces/responses/response-mother-child-price';
import { ResponseEditabilityPeriode } from '../interfaces/responses/response-editability-periode';

@Injectable({
  providedIn: 'root',
})
export class CampamentoIestService extends ServicioBase {

  constructor() {
    super();
  }

  public thePeriodIsClosed:ResponseEditabilityPeriode| null = null;

  public closeAllInputs(form:any){
    form.disable()
  }

  public CheckIfIsEditable(
    idPeriodo: string = '', // envia un carcacter numero o nombre
  ): Observable<ResponseEditabilityPeriode[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_ValidaCostos',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idPeriodo }, '/api/CAMP/CAMP.php');
  }

  public GetPeriods() //extras: any = null, // envia un carcacter numero o nombre
  //PER_BuscadoresPersonas,
  : Observable<SelectedCatalog[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_CatalogosCostosPeriodo',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros }, '/api/CAMP/CAMP.php');
  }

  public GetBaseFee(
    idPeriodo: string, // envia un carcacter numero o nombre
  ): Observable<ResponseGetFee[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_CatalogosTarifaBase',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idPeriodo }, '/api/CAMP/CAMP.php');
  }

  public GetMaternalPrices(
    idPeriodo: string, // envia un carcacter numero o nombre
  ): Observable<ResponseIdDescont[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_CatalogosPreciosMaternal',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idPeriodo }, '/api/CAMP/CAMP.php');
  }

  public GetChildishPrices(
    idPeriodo: string, // envia un carcacter numero o nombre
  ): Observable<ResponseIdDescont[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_CatalogosPreciosInfantil',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idPeriodo }, '/api/CAMP/CAMP.php');
  }

  public GetAdditionalCosts(
    idPeriodo: string, // envia un carcacter numero o nombre
  ): Observable<any[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_CatalogosDiversos',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idPeriodo }, '/api/CAMP/CAMP.php');
  }

  public GenerateMigrationNewPeriod(
    idPeriodo: string, // envia un carcacter numero o nombre
  ): Observable<any[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_CostosAdminAlta',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idPeriodo }, '/api/CAMP/CAMP.php');
  }

  public deleteGeneration(
    idPeriodo: string, // envia un carcacter numero o nombre
  ): Observable<any[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_BorradoPruebasCostos',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idPeriodo }, '/api/CAMP/CAMP.php');
  }


  public updateCost(
    idCosto: string, costo: string // envia un carcacter numero o nombre
  ): Observable<any[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_ActualizaCostoBaseCampamento',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idCosto , costo }, '/api/CAMP/CAMP.php');
  }

  public updateDescount(
    idDescuento: string, costo: string // envia un carcacter numero o nombre
  ): Observable<any[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_ActualizaDescuentos',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros, idDescuento , costo }, '/api/CAMP/CAMP.php');
  }

  public closePeriod(
    idRegistroAdmin: string = ''
  ): Observable<any[]> {
    const parametros = {
      servicio: 'costos',
      accion: 'CAMP_CostosAdminCierra',
      tipoRespuesta: 'json',
    };
    return this.consulta({ ...parametros,  idRegistroAdmin }, '/api/CAMP/CAMP.php');
  }

}

