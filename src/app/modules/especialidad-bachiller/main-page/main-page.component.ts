import {
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
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MaterialModule, JsonPipe, NgClass, SharedModule, AsyncPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent extends SnackbarComponent implements OnInit {
  dataSource!: MatTableDataSource<any>; // protected dataSource!: MatTableDataSource<any>
  displayedColumns!: any[];
  protected especialidades: WritableSignal<especialidades[]> = signal([]);
  protected students: WritableSignal<any> = signal([]);
  private special = inject(EspecialityServicesAService);

  ngOnInit(): void {
    this.tryAsinc();
    // this.special
    //   .getAllEspecialities()
    //   .pipe()
    //   .subscribe((r: especialidades[]) => {
    //     this.displayedColumns = r.map((r) => r.abreviatura);
    //     this.displayedColumns.unshift('alumno');
    //
    //     this.especialidades.set(r);
    //
    //     this.special.getAllStudents().subscribe((response: student[]) => {
    //       this.students.set(new MatTableDataSource(response));
    //     });
    //   });
  }

  async tryAsinc() {
    try {
      //PROMESAS
      const alumnos: student[] = await firstValueFrom(
        this.special.getAllStudents(),
      );
      const specialities: especialidades[] = await firstValueFrom(
        this.special.getAllEspecialities(),
      );

      //ASIGNACIÓN
      this.displayedColumns = specialities.map(
        (row: especialidades) => row.abreviatura,
      );
      this.displayedColumns.unshift('alumno');

      this.especialidades.set(specialities);
      this.students.set(new MatTableDataSource(alumnos));
    } catch (err) {
      console.log(err);
    }
    // finally {
    //   console.log('Carga completa');
    // }
  }

  async modifySpeciality({ value }: any, id: number) {
    try {
      const response = await firstValueFrom(
        this.special.patchSpeciality(value, id),
      );
      console.log(response);
    } catch (err) {
      console.error(err);
      this.errorSnackBar();
      this.tryAsinc();
      //window.location.reload();
    }
  }

  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.students().filter = filterValue.trim().toLowerCase();
  }

  isSame(alumn: number, abre: number) {
    return alumn === abre;
  }

  //? Al tocar un radio button se envián un  radio button.
  onChange({ value }: any, id: number) {
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

  //? Metodo accionado para filtrar por nombre o idiest.
}

/// INTERFACES ///

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
