import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HeaderTable } from '../../interfaces/header-tables';

enum bandera {
    Disponible,
    Vacia,
    SinRespuesta
}
@Component({
  selector: 'shr-tabla',
  standalone: false,
  //imports: [MatTableModule, MatPaginatorModule, MatCheckboxModule, FormsModule],
  templateUrl: './tabla-contraloria.component.html',
  styleUrl: './tabla-contraloria.component.scss',
})
export class TablaContraloriaComponent implements OnChanges{
  @Input() tableHead!: HeaderTable[];
  @Input() data!: any[];
  @Input() checkList: boolean = false;
  @Input() requiereIndex: boolean = false;

  dataSource!: MatTableDataSource<any>;

  markAll: boolean = true;
  banderaNoHayElementos: boolean = false;
  protector = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /*   itemsSeleccionados: any = {
    selectedAll: false,
    data: this.data
  } */

  ngOnChanges(changes: SimpleChanges): void {
/*     console.log('Onchange'); */
    if(changes['data']){
      this.construirTabla();
    }
  }
/*
  ngAfterViewInit() {
    console.log('Afterview');

    this.construirTabla();

  } */

  construirTabla(){
/*     console.log('Log',this.data); */
    this.protector = true  // La primera ves que tenga datos
    if(this.data.length>0){
      this.dataSource = new MatTableDataSource(this.addIndex(this.data));
      this.dataSource.paginator = this.paginator;
      this.banderaNoHayElementos = true;

    }else{
      this.banderaNoHayElementos = false;
    }
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
    if(this.requiereIndex){
      sti.unshift('No.');
    }
    return sti;
  }

  seleccionarTodos() {
    this.markAll =
      this.dataSource.data != null && this.dataSource.data.every((t) => t.active);
  }

  setAll(completed: boolean) {
    this.markAll = completed;
    /*   if (this.task.subtasks == null) {
      return;
    } */
    this.dataSource.data.forEach((t) => (t.active = completed));
  }

  addIndex(data: any) {
    if(!this.requiereIndex) return data; // Si no requiere indices devuelve
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
