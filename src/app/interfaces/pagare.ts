export interface Pagare {
  idPerson: string,
  nombre: string,
  abrCarrera: string,
  idGrado: number,
  costoInsumo: number,
  correo: string,
  nombreResponsable: string,
  direccion: PagareDireccion
}

export interface PagareDireccion {
  direccion: string,
  colonia: string,
  cp: string,
  telefono: string,
  entreCalles: string
}
