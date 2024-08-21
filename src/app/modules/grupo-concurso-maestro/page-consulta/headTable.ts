import { HeaderTable } from '@shared/interfaces/header-tables';

// export const HEADTABLE: HeaderTable[] = [
//   { label: 'ID', namePropiedad: 'idPerson' },
//   { label: 'Nombre', namePropiedad: 'nombre' },
//   { label: 'Carrera', namePropiedad: 'idGrado' },
//   { label: 'Costo', namePropiedad: 'costoInsumos', currency: 'true' },
//   { label: 'Correo', namePropiedad: 'correo' },
//   { label: 'Responsable', namePropiedad: 'nombreResponsable' },
// ]; //Header necesario para componente shr-table  { label: 'Todo', namePropiedad: 'active', checklist: 'true' },

export const HEADTABLE: HeaderTable[] = [
  // { label: 'Periodo', namePropiedad: 'Periodo' },
  { label: 'Equipo', namePropiedad: 'idEquipo' },
  { label: 'Nombre Lider', namePropiedad: 'nombreLider' },
  { label: 'Periodo', namePropiedad: 'Periodo' },
  { label: 'Fecha Alta', namePropiedad: 'fechaAlta' },
  { label: 'Descripcion', namePropiedad: 'descripcion' },
  // { label: 'idCurso', namePropiedad: 'idCurso' },
  // { label: 'idPersonLider', namePropiedad: 'idPersonLider' },
  // { label: 'idAlumnoLider', namePropiedad: 'idAlumnoLider' },
  { label: 'tipo', namePropiedad: 'tipo' },
]; //Header necesario para componente shr-table  { label: 'Todo', namePropiedad: 'active', checklist: 'true' },

export const DATA: any = [
  { concurso: 'CONCURSO', grupo: 'E1', alumnos: 'BETITO, FLULU, BETTY' },
];

export const HEADTABLEMINI: HeaderTable[] = [
  { label: 'ID PERSON', namePropiedad: 'IDPERSON' },
  { label: 'Nombre', namePropiedad: 'nombre' },
];
