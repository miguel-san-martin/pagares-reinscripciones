import { HeaderTable } from '../../../../shared/interfaces/header-tables';

export const HEADTABLE: HeaderTable[] = [
  { label: 'ID', namePropiedad: 'idPerson' },
  { label: 'Nombre', namePropiedad: 'nombre' },
  { label: 'Carrera', namePropiedad: 'idGrado' },
  { label: 'Costo', namePropiedad: 'costoInsumos', currency: 'true' },
  { label: 'Correo', namePropiedad: 'correo' },
  { label: 'Responsable', namePropiedad: 'nombreResponsable' },
  { label: 'Todo', namePropiedad: 'active', checklist: 'true' },
]; //Header necesario para componente shr-table
