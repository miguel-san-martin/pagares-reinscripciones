import { HeaderTable } from '@shared/interfaces/header-tables';

// LAYOUT DE TABLA PRINCIPAL
export const HEADTABLE: HeaderTable[] = [
  { label: 'Equipo', namePropiedad: 'idEquipo' },
  { label: 'Nombre Lider', namePropiedad: 'nombreLider' },
  { label: 'Fecha Alta', namePropiedad: 'fechaAlta' },
  { label: 'Descripcion', namePropiedad: 'descripcion' },
  { label: 'Tipo', namePropiedad: 'tipo' },
];
// LAYOUT DE TABLA SECUNDARIA
export const HEADTABLEMINI: HeaderTable[] = [
  { label: 'ID IEST', namePropiedad: 'IDPERSON' },
  { label: 'Nombre', namePropiedad: 'nombre' },
];
