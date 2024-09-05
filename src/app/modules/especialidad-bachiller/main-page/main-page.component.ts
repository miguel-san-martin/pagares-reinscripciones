import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { EspecialityServicesAService } from '../services/especiality-services-a.service';
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../shared-material-module/material.module';
import { SharedModule } from '@shared/shared.module';
import { SnackbarComponent } from '../../camping/components/snackbar/snackbar.component';
import { firstValueFrom } from 'rxjs';
import { ToastIestComponent } from '@shared/components/toast-iest/toast-iest.component';

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
  readonly activo = signal(false);
  @ViewChild('toast') toast!: ToastIestComponent;

  ngOnInit(): void {
    this.tryAsinc();
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

  async modifySpeciality({ value }: { value: number }, id: number) {
    this.activo.set(true);
    this.barra.set(false);
    try {
      const response = await firstValueFrom(
        this.special.patchSpeciality(value, id),
      );
      console.log(response);
    } catch (err) {
      console.error(err);
      this.tryAsinc();
      //window.location.reload();
    } finally {
      setInterval(() => {
        //computed(() => !this.hidden());
        this.barra.set(true);
      }, 4000);
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

  barra = signal<any | null>(null);
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
