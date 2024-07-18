import {
  AfterViewInit,
  Component,
  effect,
  input,
  ViewChild,
} from '@angular/core';
import { HeaderTable } from '@shared/interfaces/header-tables';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shared-table-iest',
  standalone: false,
  templateUrl: './table-iest.component.html',
  styles: ``,
})
export class TableIESTComponent<T> implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly tableHead = input.required<HeaderTable[]>();
  readonly data = input.required<T[]>();
  protected dataSource!: MatTableDataSource<T>;
  readonly filtering = input<string>('');

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  protected effectData = effect(() => {
    console.log('Effect');
    this.dataSource = new MatTableDataSource(this.data());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: T, property: string) => {

      let indice = 0;
      this.tableHead().forEach((head: HeaderTable, index: number) => {
        if (head.namePropiedad.toLowerCase().includes(property.toLowerCase())) {
          console.log(index);
          indice = index;
        }
      })

      console.log(item, property);
      console.log(this.tableHead());
      console.log(this.tableHead()[indice].namePropiedad);

      return '0';
      // return item[this.tableHead[indice] as keyof HeaderTable];

    };
  });
  readonly effectFilter = effect(() => {
    this.dataSource.filter = this.filtering().trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  });

  ngAfterViewInit(): void {
    console.log(this.data());
    console.log(this.tableHead());
  }

  get displayedColums(): string[] {
    const sti: string[] = [];
    if (this.tableHead() === undefined)
      console.error('No se ha mandado encabezados');
    if (this.tableHead() === undefined) return sti;
    this.tableHead().map((row: HeaderTable) => {
      sti.push(row.label);
    });
    return sti;
  }

  announceSortChange() {
    this.dataSource.sortingDataAccessor = (item: T, property: string) => {

      let indice = 0;
      this.tableHead().forEach((head: HeaderTable, index: number) => {
        if (head.label.toLowerCase().includes(property.toLowerCase())) {
          console.log(index);
          indice = index;
        }
      })

      console.log(item, property);
      console.log(this.tableHead());
      console.log(this.tableHead()[indice].namePropiedad);

      return "item[indice]"
      // return item[this.tableHead[indice] as keyof HeaderTable];

    };


  }
}
