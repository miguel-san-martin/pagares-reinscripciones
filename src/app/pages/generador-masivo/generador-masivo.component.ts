import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material-module/material.module';
import { Subscription } from 'rxjs';
import { PagareReinscripcionesService } from '../../services/pagare-reinscripciones.service';
import { TablaContraloriaComponent } from '../../shared/components/tabla-contraloria/tabla-contraloria.component';
import { Pagare } from '../../interfaces/pagare';

@Component({
  standalone: true,
  imports: [MaterialModule, TablaContraloriaComponent],
  templateUrl: './generador-masivo.component.html',
  styleUrl: './generador-masivo.component.scss',
})
export class GeneradorMasivoComponent {
  Service = inject(PagareReinscripcionesService);

  public contador: number = 0;
  public intervalo: any;

  public headTable = [
    { label: 'ID', namePropiedad: 'idPerson' },
    { label: 'Nombre', namePropiedad: 'nombre' },
    { label: 'Carrera', namePropiedad: 'abrCarrera' },
    { label: 'Costo', namePropiedad: 'costoInsumo' },
    { label: 'Correo', namePropiedad: 'correo' },
    { label: 'Grado', namePropiedad: 'idGrado' },
    { label: 'Responsable', namePropiedad: 'nombreResponsable' },
  ];

  public data: Pagare[] = [
    {
      idPerson: '22400',
      nombre: 'SALDIERNA ORTEGA VICTOR HUGO',
      abrCarrera: 'IQ20',
      costoInsumo: 2000,
      correo: 'victor.saldierna@iest.edu.mx',
      idGrado: 2,
      nombreResponsable: 'VICTOR HUGO SALDIERNA RIOS',
      direccion: {
        direccion: 'Fernandas 111 B	Fracc. Fernandas',
        colonia: 'Laguna de Champayan ',
        cp: '89439',
        telefono: '38129128102',
        entreCalles: 'Laguna de Champayan y Fernandas norte',
      },
    },
    {
      idPerson: '22400',
      nombre: 'SALDIERNA ORTEGA VICTOR HUGO',
      abrCarrera: 'IQ20',
      costoInsumo: 2000,
      correo: 'victor.saldierna@iest.edu.mx',
      idGrado: 2,
      nombreResponsable: 'VICTOR HUGO SALDIERNA RIOS',
      direccion: {
        direccion: 'Fernandas 111 B	Fracc. Fernandas',
        colonia: 'Laguna de Champayan ',
        cp: '89439',
        telefono: '38129128102',
        entreCalles: 'Laguna de Champayan y Fernandas norte',
      },
    },
    {
      idPerson: '22400',
      nombre: 'SALDIERNA ORTEGA VICTOR HUGO',
      abrCarrera: 'IQ20',
      costoInsumo: 2000,
      correo: 'victor.saldierna@iest.edu.mx',
      idGrado: 2,
      nombreResponsable: 'VICTOR HUGO SALDIERNA RIOS',
      direccion: {
        direccion: 'Fernandas 111 B	Fracc. Fernandas',
        colonia: 'Laguna de Champayan ',
        cp: '89439',
        telefono: '38129128102',
        entreCalles: 'Laguna de Champayan y Fernandas norte',
      },
    },
    {
      idPerson: '22400',
      nombre: 'SALDIERNA ORTEGA VICTOR HUGO',
      abrCarrera: 'IQ20',
      costoInsumo: 2000,
      correo: 'victor.saldierna@iest.edu.mx',
      idGrado: 2,
      nombreResponsable: 'VICTOR HUGO SALDIERNA RIOS',
      direccion: {
        direccion: 'Fernandas 111 B	Fracc. Fernandas',
        colonia: 'Laguna de Champayan ',
        cp: '89439',
        telefono: '38129128102',
        entreCalles: 'Laguna de Champayan y Fernandas norte',
      },
    },
    {
      idPerson: '22400',
      nombre: 'SALDIERNA ORTEGA VICTOR HUGO',
      abrCarrera: 'IQ20',
      costoInsumo: 2000,
      correo: 'victor.saldierna@iest.edu.mx',
      idGrado: 2,
      nombreResponsable: 'VICTOR HUGO SALDIERNA RIOS',
      direccion: {
        direccion: 'Fernandas 111 B	Fracc. Fernandas',
        colonia: 'Laguna de Champayan ',
        cp: '89439',
        telefono: '38129128102',
        entreCalles: 'Laguna de Champayan y Fernandas norte',
      },
    },
    {
      idPerson: '22400',
      nombre: 'SALDIERNA ORTEGA VICTOR HUGO',
      abrCarrera: 'IQ20',
      costoInsumo: 2000,
      correo: 'victor.saldierna@iest.edu.mx',
      idGrado: 2,
      nombreResponsable: 'VICTOR HUGO SALDIERNA RIOS',
      direccion: {
        direccion: 'Fernandas 111 B	Fracc. Fernandas',
        colonia: 'Laguna de Champayan ',
        cp: '89439',
        telefono: '38129128102',
        entreCalles: 'Laguna de Champayan y Fernandas norte',
      },
    },
    {
      idPerson: '22400',
      nombre: 'SALDIERNA ORTEGA VICTOR HUGO',
      abrCarrera: 'IQ20',
      costoInsumo: 2000,
      correo: 'victor.saldierna@iest.edu.mx',
      idGrado: 2,
      nombreResponsable: 'VICTOR HUGO SALDIERNA RIOS',
      direccion: {
        direccion: 'Fernandas 111 B	Fracc. Fernandas',
        colonia: 'Laguna de Champayan ',
        cp: '89439',
        telefono: '38129128102',
        entreCalles: 'Laguna de Champayan y Fernandas norte',
      },
    },
  ];

  suscription!: Subscription;

  simularBarra() {
    this.suscription?.unsubscribe;

    if (this.suscription?.closed !== false) {
      this.suscription = this.Service.startTiemer().subscribe((value) => {
        this.contador = value;
        console.log(this.contador);
      });
    }
  }

  listaPagare = [
    {
      nombre: 'Impulsa',
      value: 'Impulsa',
    },
    {
      nombre: 'Vertice',
      value: 'Impulsa',
    },
    {
      nombre: 'Curso idioma',
      value: 'Impulsa',
    },
    {
      nombre: 'Cursos Convencionales',
      value: 'Impulsa',
    },
    {
      nombre: 'Examenes',
      value: 'Impulsa',
    },
    {
      nombre: 'Competencias',
      value: 'Impulsa',
    },
  ];
}
