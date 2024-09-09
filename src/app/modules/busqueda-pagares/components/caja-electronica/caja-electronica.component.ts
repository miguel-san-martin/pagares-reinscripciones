import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../shared-material-module/material.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PagareServiceService } from '../../services/pagare-service.service';
import {
  AlumnoWebList,
  Grados,
  togasPorFechaRequest,
} from '../../interfaces/togas.interface';
import { map, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-caja-electronica',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './caja-electronica.component.html',
  styleUrl: './caja-electronica.component.scss',
})
export class CajaElectronicaComponent implements OnInit, AfterViewInit {
  constructor(private cc: PagareServiceService) {}

  //Paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public mostrarLoader: boolean = true;
  public mostrarPaginator: boolean = false;
  public tableHeads: string[] = ['No°', 'idalumno', 'nombre', 'pagare'];
  public dataSource = new MatTableDataSource<AlumnoWebList>();
  public gradosAlumnos!: Grados[];
  public consultaFechas = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    grado: new FormControl('0'),
  });

  ngOnInit(): void {
    this.mostrarLoader = false;
    this.obtenerGrados();
    //this.buscarPersonaPorFecha();
  }

  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
  }

  public buscarPersonaPorFecha() {
    const grado = this.consultaFechas?.get('grado')?.value;
    const fechasInicio = this.consultaFechas.get('start')?.value;
    const fechaFin = this.consultaFechas.get('end')?.value;

    if (grado === '0' || grado === 'null')
      return console.error('No se especificado grado', grado);
    if (!fechaFin)
      return console.error('No se especificado fecha', fechaFin, fechasInicio);

    const tableDefault: togasPorFechaRequest = {
      idAlumno: '0',
      idgrado: grado as string, // Aqui le dije tu confia no va a ser null ni undefined
      fechaInicio: this.cc.formatearFecha(fechasInicio),
      fechaFin: this.cc.formatearFecha(fechaFin),
      idcaja: '14',
    };

    this.cc
      .PER_BuscadoresPersonasPorFecha(tableDefault)
      .pipe(
        tap(() => {
          this.mostrarLoader = true;
        }),
        //Operacion para añadirle indice entra arreglo sale arreglo + propiedad indice +1
        map((response: AlumnoWebList[]) => {
          response.forEach((row: AlumnoWebList, index: number) => {
            response[index] = { index: index + 1, ...row };
          });
          return response;
        }),
      )
      .subscribe((response: AlumnoWebList[]) => {
        console.log('Respuesta:', response);
        this.mostrarLoader = false;
        this.mostrarPaginator = true;
        this.dataSource = new MatTableDataSource<AlumnoWebList>(response);
        this.dataSource.paginator = this.paginator;
      });
  }

  private obtenerGrados() {
    this.cc.TOGA_Consulta_Grados().subscribe((response: Grados[]) => {
      this.gradosAlumnos = response;
    });
  }

  public abrirNavegador(): void {
    const grado = this.consultaFechas.get('grado')?.value || '0';
    const inicio = this.cc.formatearFecha(
      this.consultaFechas.get('start')?.value,
    );
    const fin = this.cc.formatearFecha(this.consultaFechas.get('end')?.value);
    window.open(this.cc.generarUrlRPT(grado, '0', '0', inicio, fin), '_blank');
  }

  // Este metodo se manda a llamar en el html por cada row,
  // El alumno se manda a llamar de datasource
  public getUrl(alumno: any): string {
    alumno = {
      idAlumno: alumno.IDALUMNO,
      ...alumno,
    };
    delete alumno.IDALUMNO;
    //console.log(alumno);
    return this.cc.generarUrlRPT(
      alumno.idGrado,
      alumno.idAlumno,
      '0',
      '19000101',
      '19000101',
    );
  }
}
