import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { EspecialityServicesAService } from '../services/especiality-services-a.service';
import { MaterialModule } from '../../../shared-material-module/material.module';
import { JsonPipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MaterialModule, JsonPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit, AfterViewInit {
  private special = inject(EspecialityServicesAService);
  // protected especialidades: WritableSignal<especialidades[]> = signal([]);
  protected especialidades: WritableSignal<especialidades[]> = signal([]);
  dataSource!: MatTableDataSource<any>;

  // protected dataSource!: MatTableDataSource<any>
  displayedColumns!: any[];
  ALUMNO: any[] = [
    { alumno: 'mike', especialidad: 10, IDIEST: 1251 },
    { alumno: 'raul', especialidad: 4, IDIEST: 12112 },
    {
      alumno: 'juanmaik',
      especialidad: 1,
      IDIEST: 128541,
    },
  ];

  ngOnInit(): void {
    this.special.getAllEspecialities().subscribe((r: especialidades[]) => {
      this.displayedColumns = r.map((r) => r.abreviatura);
      this.displayedColumns.unshift('alumno');

      this.especialidades.set(r);

      this.dataSource = new MatTableDataSource(this.ALUMNO);

      console.log('0data', this.dataSource);
      // this.dataSource.data = r;
    });
  }

  ngAfterViewInit() {
    console.log();
  }

  isSame(alumn: number, abre: number) {
    return alumn === abre;
  }

  spech({ value }: any, id: number) {
    console.log(value, id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }
}

export interface especialidades {
  uuid: string;
  id: number;
  nombre: string;
  abreviatura: string;
}
