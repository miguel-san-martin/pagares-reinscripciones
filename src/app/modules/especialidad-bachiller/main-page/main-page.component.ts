import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { EspecialityServicesAService } from '../services/especiality-services-a.service';
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../shared-material-module/material.module';
import { SharedModule } from '@shared/shared.module';
import { SnackbarComponent } from '../../camping/components/snackbar/snackbar.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MaterialModule, JsonPipe, NgClass, SharedModule, AsyncPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent
  extends SnackbarComponent
  implements OnInit, AfterViewInit
{
  dataSource!: MatTableDataSource<any>;
  // protected dataSource!: MatTableDataSource<any>
  displayedColumns!: any[];
  ALUMNO: any[] = [];
  // protected especialidades: WritableSignal<especialidades[]> = signal([]);
  protected especialidades: WritableSignal<especialidades[]> = signal([]);
  protected students: WritableSignal<any> = signal([]);
  private special = inject(EspecialityServicesAService);

  ngOnInit(): void {
    this.special.getAllEspecialities().subscribe((r: especialidades[]) => {
      this.displayedColumns = r.map((r) => r.abreviatura);
      this.displayedColumns.unshift('alumno');

      this.especialidades.set(r);
      //this.dataSource = new MatTableDataSource(this.ALUMNO);

      this.special.getAllStudents().subscribe((response: student[]) => {
        this.students.set(new MatTableDataSource(response));
        console.log('0data', this.students());
      });
    });
  }

  ngAfterViewInit() {
    console.log();
  }

  isSame(alumn: number, abre: number) {
    return alumn === abre;
  }

  spech({ value }: any, id: number) {
    this.openSnackBar();
    this.special.patchSpeciality(value, id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: () => {
        this.errorSnackBar();
        window.location.reload();
      },
    });
    console.log(value, id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.students().filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
  }
}

export interface especialidades {
  uuid: string;
  id: number;
  nombre: string;
  abreviatura: string;
}

export interface student {
  alumno: string;
  especialidad: number;
  IDIEST: number;
}
