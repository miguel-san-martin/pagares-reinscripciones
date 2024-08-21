import {
  AfterViewInit,
  Component,
  effect,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { HeaderTable } from '@shared/interfaces/header-tables';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shared-table-iest',
  standalone: false,
  templateUrl: './table-iest.component.html',
  styles: `
    ::ng-deep .mat-sort-header-container {
      color: white !important;
    }

    ::ng-deep .isSelectionable {
      cursor: pointer;
    }

    ::ng-deep .selectedRow {
      background-color: #bceeff !important;

      &:hover {
        background-color: #55c9ef !important;
      }
    }
  `,
})
export class TableIESTComponent<T> implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly tableHead = input.required<HeaderTable[]>();
  readonly data = input.required<T[]>();
  readonly filtering = input<string>('');
  protected dataSource!: MatTableDataSource<T>;

  //! SECCION PARA FUNCIONALIDAD DE SELECT ROW
  readonly selectionableOutpu = output();
  readonly isSelectionable = input<boolean>(false);
  selectingRow = signal(null);
  readonly effectFilter = effect(() => {
    if (this.dataSource)
      this.dataSource.filter = this.filtering().trim().toLowerCase();
    this.dataSource?.paginator?.firstPage();
  });
  protected effectData = effect(() => {
    this.dataSource = new MatTableDataSource(this.data());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: T, property: string) => {
      let indice = 0;
      this.tableHead().forEach((head: HeaderTable, index: number) => {
        if (head.namePropiedad.toLowerCase().includes(property.toLowerCase())) {
          // console.log(index);
          indice = index;
        }
      });

      // console.log(item, property);
      // console.log(this.tableHead());
      // console.log(this.tableHead()[indice].namePropiedad);

      return '0';
      // return item[this.tableHead[indice] as keyof HeaderTable];
    };
  });
  protected readonly event = event;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

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

  ngAfterViewInit(): void {
    let a = 0;
  }

  emitSelected($event: any) {
    if (this.isSelectionable()) {
      this.selectionableOutpu.emit($event);
      this.selectingRow.set($event);
    }
  }
}
