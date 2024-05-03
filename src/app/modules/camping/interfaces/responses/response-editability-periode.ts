type status = "Cerrada" | "No Capturado" | "PermiteCambios"
// type status = "Cerrada" | "No Capturado" | "PermiteCambios"
export enum _estatus {
  Cerrado = "Cerrado",
  NoCapturado = "No Capturado",
  Abierto =  "PermiteCambios"
}
export interface ResponseEditabilityPeriode {
  estatus: _estatus;
  existe:  string;
  msj:     string;
  idRegistro: string;
  idPeriodo?: string;
}
