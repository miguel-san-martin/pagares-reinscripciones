export interface ResponseCatalogosConcurso {
  idConcurso: number;
  descripcion: string;
}

export interface ResponsePeriods {
  idPeriodo: number;
  Periodo: string;
}

export interface ResponseTipos {
  tipo: number;
  descripcion: string;
}

export interface ResponseQuery {
  tipo: number;
  descripcion: string;
}

export interface ResoponseTeams {
  idEquipo: number;
  idCurso: number;
  descripcion: string;
  idPersonLider: string;
  idAlumnoLider: number;
  nombreLider: string;
  Periodo: string;
  tipo: string;
  fechaAlta: string;
}
