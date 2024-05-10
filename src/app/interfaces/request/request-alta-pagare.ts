export interface RequestAltaPagare {
  idOperacion: string,
  monto: string,
  cantidadPromesas: number,
  fechasPromesas: string,
  idGeneracion:string
  idRegistro?: string;
}
