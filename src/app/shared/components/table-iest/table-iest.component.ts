import {
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
export class TableIESTComponent<T> {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly tableHead = input.required<HeaderTable[]>();
  readonly data = input.required<T[]>();
  readonly filtering = input<string>('');
  //! SECCION PARA FUNCIONALIDAD DE SELECT ROW
  readonly selectionableOutpu = output();
  readonly isSelectionable = input<boolean>(false);
  selectingRow = signal(null);
  protected dataSource!: MatTableDataSource<T>;
  readonly effectFilter = effect(() => {
    if (this.dataSource)
      this.dataSource.filter = this.filtering().trim().toLowerCase();
    this.dataSource?.paginator?.firstPage();
  });
  protected effectData = effect(() => {
    this.dataSource = new MatTableDataSource(this.data());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      const map = new Map(
        this.tableHead().map((item: HeaderTable) => [
          item.label,
          item.namePropiedad,
        ]),
      );
      // console.log('it', item, 'pro', property);
      // console.log(map.get(property), item);
      const head: string = map.get(property) || 'error';
      return item[head];
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

  emitSelected($event: any) {
    if (this.isSelectionable()) {
      this.selectionableOutpu.emit($event);
      this.selectingRow.set($event);
    }
  }
}
