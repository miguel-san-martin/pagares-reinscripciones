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
  concepto: string;
  idParametro: string;
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
  bacherorList: listParameters[] = [];
  listExtra: listParameters[] = [];

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {

    this.horariosExamenes
      .getListHorarios()
      .pipe(
        map((array) =>
          array.parametros.map((item: any) => ({
            concepto: item.concepto,
            idParametro: Number(item.idParametro),
            descripcion: item.descripcion,
            parametroInt: Number(item.parametroInt),
            grado: item.grado,
          })),
        ),
        delay(250),
      )
      .subscribe(
        (response) => {
          this.listResponse = response;
          this.listResponse.forEach(
            (item:listParameters) => {
              switch (item.grado.toLowerCase()){
                case('preparatoria'):
                  this.bacherorList.push(item);
                  break;
                case ('profesional'):
                  this.profesionalList.push(item);
                  break;
                default:
                  this.listExtra.push(item)
              }
          }
          )


          // this.bacherorList = this.listResponse.filter(id => id.grado.toLowerCase() === 'preparatoria');
          // this.profesionalList = this.listResponse.filter(id => id.grado.toLowerCase() === 'profesional');

          console.log(this.profesionalList);
          console.log(this.bacherorList);
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.loadingScreen.nativeElement.style.display = 'none';
        },
      );
  }


  onChange(id: number, event: any) {
    this.loadingScreen.nativeElement.style.display = 'block';
    this.bacherorList=[]
    this.profesionalList=[]
    this.listExtra = []
    console.log(id, event.checked);
    this.horariosExamenes.patchListHorarios(id).subscribe(
      (response) => {
        console.log(response);
        this.loadList();
      },
      () => {},
      () => {},
    );
  }
}
