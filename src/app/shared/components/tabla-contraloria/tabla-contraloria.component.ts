import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'shr-tabla',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatCheckboxModule, FormsModule],
  templateUrl: './tabla-contraloria.component.html',
  styleUrl: './tabla-contraloria.component.scss',
})
export class TablaContraloriaComponent {
  @Input() tableHead!: any[];
  @Input() data!: any[];
  @Input() checkList?: boolean = false;
  dataSource!: MatTableDataSource<any>;

  markAll: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /*   itemsSeleccionados: any = {
    selectedAll: false,
    data: this.data
  } */

  constructor() {
    this.dataSource = new MatTableDataSource(this.addIndex(this.data));
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.addIndex(this.data));
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }

  /**
   * Metodo que extrae la lista con los nombres y lo devuelve para que el hr los interprete
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
    sti.unshift('No.');
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

  imprimir($event: any) {
    console.log($event);
  }

  addIndex(data: any) {
    if (!this.data) return;
    data = this.data.map((r, index) => {
      const salida = { posicion: index + 1, ...r };
      console.log(salida);
      return salida;
    });

    return data;
  }
}
