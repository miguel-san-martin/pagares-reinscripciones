import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MaterialModule } from '../../../../shared-material-module/material.module';
import { PagareServiceService } from '../../services/pagare-service.service';
import { ValidacionPago } from '../../interfaces/togas.interface';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-caja-fisica',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  templateUrl: './caja-fisica.component.html',
  styleUrl: './caja-fisica.component.scss',
})
export class CajaFisicaComponent {
  //TODO : Hacer que cuando no haya nada seleccionado muestre una señal que no esta activo.

  constructor(private pagareService: PagareServiceService) {}

  public alumnos: any[] = []; // Variable que almacena conjunto alumnos buscados
  public nameCtrl = new FormControl(); // Form Control del input
  public buttonState = false;
  public mensaje!: string;
  public mostrarMensaje!: boolean;

  onOptionSelected($event: MatAutocompleteSelectedEvent) {
    const { idperson, idalumno } = $event.option.value;

    //console.log('idPerson', idperson, 'idAlumno', idalumno);

    this.pagareService
      .TOGA_Consulta_Valido({ idAlumno: idalumno, idIest: idperson })
      .pipe(
        map((response: ValidacionPago[]) => {
          return response[0];
        }),
      )
      .subscribe((response) => {
        this.mostrarMensaje = true;
        response.generar
          ? (this.buttonState = true)
          : (this.buttonState = false);
        this.mensaje = response.mensaje;
      });
  }

  public searchAlumnos(): void {
    const value: string = this.nameCtrl.value;
    this.pagareService
      .PER_BuscadoresPersonas({ indicador: value })
      .subscribe((response: any) => {
        //console.log(response);

        this.alumnos = response;
      });
  }

  //Este metodo es de mat, envia el value actual y devuelve un string con lo que debera decir el input.
  public displayFn(alumno: any) {
    if (!alumno) return '';
    return alumno.nombre + ' - ' + alumno.idperson;
  }

  private get url() {
    const alumno: any = this.nameCtrl.getRawValue();
    const { idalumno, idGrado } = alumno;
    const reporteador = 'RPT_Pagare_Togasv2.rpt';
    // Promt 2 es caja promt 3 y 4 fecha inicio fecha fin
    const enlace = `https://reportes.iest.edu.mx/app/reportes/Convert/Default.aspx?prompt0=${idalumno}&prompt1=${idGrado}&prompt2=0&prompt3=19000101&prompt4=19000101&reporte=${reporteador}`;
    console.log('YEK', enlace);
    return enlace;
  }

  public abrirNavegador() {
    if (this.nameCtrl.value === '') return;
    window.open(this.url, '_blank');
  }

  public get getErrorMessage() {
    return this.mensaje;
  }
}
