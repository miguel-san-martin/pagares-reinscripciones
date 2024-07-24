import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../../shared-material-module/material.module';
import { AdministraConfiguracionService } from '../administra-configuracion.service';
import { delay, map } from 'rxjs';
import { CommonModule } from '@angular/common';

interface listParameters {
  idParametro: string;
  concepto: string;
  descripcion: string;
  parametroInt: string;
  grado: string;
  estado?: boolean;
}

@Component({
  selector: 'app-page-config',
  standalone: true,
  imports: [SharedModule, MaterialModule, CommonModule],
  templateUrl: './page-config.component.html',
  styleUrl: 'page-config.component.scss',
})
export class PageConfigComponent implements OnInit {
  private horariosExamenes = inject(AdministraConfiguracionService);
  @ViewChild('loadingScreen') loadingScreen!: ElementRef;

  protected map: Map<string, listParameters[]> = new Map([]);

  ngOnInit(): void {
    this.loadList();
  }
  private loadList() {
    //Mapea la respuesta un tipo listParameters
    this.horariosExamenes
      .getListHorarios()
      .pipe(
        map((array) => {
          if (array.parametros[0].error) return array.parametros[0];
          return array.parametros.map(
            ({
              idParametro,
              parametroInt,
              grado,
              ...rest
            }: listParameters) => ({
              idParametro: Number(idParametro),
              parametroInt: Number(parametroInt),
              grado: grado.toLowerCase(),
              estado: !!parametroInt,
              ...rest,
            }),
          );
        }),
        delay(250))
      .subscribe(
        (response): void => {
          if (response.error) return;

          // Dada la respuesta, va separando en arreglos según su grado.
         /* response.push(
            {
              idParametro: '12',
              descripcion: 'asas',
              grado: 'Rectoria',
              concepto: 'OASONAO',
              parametroInt: '0',
            },
            {
              idParametro: '12',
              descripcion: 'asas',
              grado: 'rectoria',
              concepto: 'OASONAO',
              parametroInt: '0',
            },
            {
              idParametro: '12',
              descripcion: 'asas',
              grado: 'asdca',
              concepto: 'OASONAO',
              parametroInt: '0',
            },
            {
              idParametro: '12',
              descripcion: 'asas',
              grado: 'as',
              concepto: 'OASONAO',
              parametroInt: '0',
            },
            {
              idParametro: '12',
              descripcion: 'asas',
              grado: 'asdca',
              concepto: 'OASONAO',
              parametroInt: '0',
            },
          );*/
          console.table(response);
          this.setCategoriasMap(response);
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.loadingScreen.nativeElement.style.display = 'none';
        },
      );
  }

  //Evento generado al hacer cambios en el flip flop
  protected onChange(id: number) {
    this.loadingScreen.nativeElement.style.display = 'block';
    this.horariosExamenes.patchListHorarios(id).subscribe(
      () => {
        this.loadList();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  private setCategoriasMap(response:listParameters[]) {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //Usamos un SET para eliminar la duplicidad
    const categorias:string[]  = [
      ...new Set(
        response.map((item: listParameters) =>
          item.grado.toLowerCase()))
    ];

    categorias.forEach((x: string) => this.map.set(x, []));
    //Itera categorias, para inicializar el mapa con las claves
    console.log('Llaves',this.map.keys())
    console.log('Entradas',this.map.entries());

    response.forEach((item: listParameters) => {
      this.map.get(item.grado)?.push(item);
    });
  }

}
