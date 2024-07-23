import {

  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  ViewRef,
} from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../../shared-material-module/material.module';
import { AdministraConfiguracionService } from '../administra-configuracion.service';
import { delay, map } from "rxjs";
import { error } from '@angular/compiler-cli/src/transformers/util';
import { CommonModule } from "@angular/common";

interface listParameters {
  idParametro: string;
  descripcion: string;
  parametroInt: string;
}

@Component({
  selector: 'app-page-config',
  standalone: true,
  imports: [SharedModule, MaterialModule,CommonModule],
  templateUrl: './page-config.component.html',
  styleUrl: 'page-config.component.scss',
})
export class PageConfigComponent implements OnInit {
  private horariosExamenes = inject(AdministraConfiguracionService);
  @ViewChild('loadingScreen') loadingScreen!: ElementRef;
  isChecked: any;
  protected listConfigs: listParameters[] = [];

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.horariosExamenes
      .getListHorarios()
      .pipe(
        map((array) =>
          array.parametros.map((item: any) => ({
            idParametro: Number(item.idParametro),
            descripcion: item.descripcion,
            parametroInt: Number(item.parametroInt),
          })),
        ),
        delay(250)
      )
      .subscribe(
        (response) => {
          this.listConfigs = response;
          console.log(this.listConfigs);
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
    console.log(id, event.checked);
    this.horariosExamenes.patchListHorarios(id).subscribe(
      (response) => {
        console.log(response);
        this.loadList()
      },
      () => {},
      () => {},
    );
  }
}
