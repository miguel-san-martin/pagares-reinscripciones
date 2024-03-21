import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'shr-tabla',
  standalone: true,
  imports: [ MatTableModule, MatPaginatorModule],
  templateUrl: './tabla-contraloria.component.html',
  styleUrl: './tabla-contraloria.component.scss'
})
export class TablaContraloriaComponent {

  @Input() tableHead !:any[];
  @Input() data !:any[]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  get displayedColums():string[]{

    const sti:string[] = [];
    this.tableHead.map(
      (row)=> {
        sti.push(row.label)
      }
    )
    return sti;
  }
}
