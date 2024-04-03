import { HeaderTable } from "../../shared/interfaces/header-tables";

export const HEADTABLE:HeaderTable[] = [
  { label: 'ID', namePropiedad: 'idPerson' },
  { label: 'Nombre', namePropiedad: 'nombre' },
  { label: 'Carrera', namePropiedad: 'abrCarrera' },
  { label: 'Costo', namePropiedad: 'costoInsumos' },
  { label: 'Correo', namePropiedad: 'correo' },
  { label: 'Grado', namePropiedad: 'idGrado' },
  { label: 'Responsable', namePropiedad: 'nombreResponsable' },
  { label: 'Todo', namePropiedad: 'active', checklist: 'true' },
]; //Header necesario para componente shr-table
