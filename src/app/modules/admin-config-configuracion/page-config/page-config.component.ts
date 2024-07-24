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
import { delay, map, tap } from "rxjs";
import { CommonModule } from "@angular/common";

interface listParameters {
  idParametro: string;
  concepto: string;
  descripcion: string;
  parametroInt: string;
  grado:string;
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
  listResponse: listParameters[] = [];

  profesionalList: listParameters[] = [];
  bachelorList: listParameters[] = [];
  listExtra: listParameters[] = [];

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.horariosExamenes
      .getListHorarios()
      .pipe(
        //Mapea la respuesta un tipo listParameters
        map((array) => array.parametros.map(
          (item: listParameters) => ({
            idParametro: Number(item.idParametro),
            concepto: item.concepto,
            grado: item.grado,
            parametroInt: Number(item.parametroInt),
            descripcion: item.descripcion,
          }))
        ),
        //Delay para que muestre porlomenos .25 segundos el spiner
        delay(250),
      )
      .subscribe(
        (response:listParameters[]): void => {
          console.table(response);
          response.forEach(
            (item:listParameters) => {
              switch (item.grado.toLowerCase()){
                case('preparatoria'):
                  this.bachelorList.push(item);
                  break;
                case ('profesional'):
                  this.profesionalList.push(item);
                  break;
                default:
                  this.listExtra.push(item)
              }
          }
          )
          console.table(this.profesionalList);
          console.table(this.bachelorList);
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
  protected onChange(id: number, event: {checked: boolean}) {
    this.loadingScreen.nativeElement.style.display = 'block';
    this.bachelorList = [];
    this.profesionalList = [];
    this.listExtra = [];
    console.log(id, event.checked);

    this.horariosExamenes.patchListHorarios(id).subscribe(
      () => {
        this.loadList();
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
