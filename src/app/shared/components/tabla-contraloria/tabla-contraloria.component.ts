import {
  AfterRenderRef,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { HeaderTable } from '../../interfaces/header-tables';
import { MatSort } from '@angular/material/sort';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shrd-tabla',
  standalone: false,
  templateUrl: './tabla-contraloria.component.html',
  styleUrl: './../../scss/custom-template-miguel-v2.scss',
})
export class TablaContraloriaComponent
  implements AfterViewInit, OnInit, OnChanges
{
  @Input({ required: true }) tableHead!: HeaderTable[];
  @Input({ required: true }) data: any[] = [];
  @Input() checkList: boolean = false;
  @Input() requiereIndex: boolean = false;

  dataSource!: MatTableDataSource<any>;

  markAll: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.construirTabla();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.construirTabla();
    }
  }

  construirTabla() {
    this.dataSource = new MatTableDataSource(this.addIndex(this.data));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Metodo que extrae la lista con los nombres y lo devuelve para que el hr los interprete
   * Si requiere Index no se envia este no metera la columna 'No.'
   *
   * @readonly
   * @type {string[]}
   * @memberof TablaContraloriaComponent
   */
  get displayedColums(): string[] {
    const sti: string[] = [];
    this.tableHead.map((row) => {
      sti.push(row.label);
    });
    if (this.requiereIndex) {
      sti.unshift('No.');
    }
    return sti;
  }

  seleccionarTodos() {
    this.markAll =
      this.dataSource.data != null &&
      this.dataSource.data.every((t) => t.active);
  }

  setAll(completed: boolean) {
    this.markAll = completed;
    /*   if (this.task.subtasks == null) {
      return;
    } */
    this.dataSource.data.forEach((t) => (t.active = completed));
  }

  addIndex(data: any) {
    if (!this.requiereIndex) return data; // Si no requiere indices devuelve
    if (this.data.length === 0) return [];

    // Aqui se añade ala data sus indices
    data = this.data.map((r, index) => {
      const salida = { posicion: index + 1, ...r };
      //console.log(salida);
      return salida;
    });
    return data;
  }
}
