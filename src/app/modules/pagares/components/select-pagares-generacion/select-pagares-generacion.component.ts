import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../../shared-material-module/material.module';
import { Catalogo } from '../../../../interfaces/catalogo';
import { GeneracionesResponse } from '../../../../interfaces/generaciones-response';
import { ResponseAlumnoService } from '../../../../services/mappingServices/response-alumno.service';
import { PagareReinscripcionesService } from '../../services/pagare-reinscripciones.service';
import { SelectedPagareGeneracion } from '../../../../interfaces/selected-pagare-generacion';

@Component({
  selector: 'app-select-pagares',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './select-pagares-generacion.component.html',
  styleUrl: '../../../../shared/scss/custom-template-miguel-v2.scss',
})
export class SelectPagaresGeneracionComponent implements OnInit {
  Service = inject(PagareReinscripcionesService);
  Maping = inject(ResponseAlumnoService);

  @ViewChild('generacion') seleccionGeneracion!: ElementRef; //View de generacion el segundo select oculto.

  @Output('selectedCatalog')
  public emitSelectedOption: EventEmitter<SelectedPagareGeneracion> =
    new EventEmitter();

  public listaPagare!: Catalogo[]; //Lista de Catalogos
  public selectedCatalog!: string; // Valor del Select de Catalogos
  public listaGeneraciones: GeneracionesResponse[] = []; //Lista de Generaciones
  public selectedGeneracion: string | undefined; //Valor del Select de Generacion que esta oculto.
  public selectedCataloge: SelectedPagareGeneracion = {
    catalog: '',
    generation: '0',
  };
  public idConGenercion: string[] = ['798', '708'];

  ngOnInit(): void {
    /* */
    this.Service.GetCatalogosOperaciones().subscribe((response: Catalogo[]) => {
      this.listaPagare = response;
      const valorPorDefault: string = this.listaPagare[1].id;
      this.selectedCatalog = valorPorDefault;
      this.updateTable({ value: valorPorDefault }, '0');
    });

    this.Service.GetCatalogosGeneraciones().subscribe((response) => {
      this.listaGeneraciones = response;
    });
  }

  public emitSelectedCatalog(value: number) {
    this.selectedCataloge = {
      catalog: this.selectedCataloge.catalog,
      generation: this.selectedCataloge.generation,
    };
    this.displaySubSelect(this.selectedCataloge.catalog);
    this.emitSelectedOption.emit(this.selectedCataloge);
  }

  // Si es un pagare tipo Impulsa - 798 o 708 Vertice se mostrara un select con #genereacion como referencia
  displaySubSelect(id: string) {
    if (id == '798' || id == '708') {
      console.log('entra');
      this.seleccionGeneracion.nativeElement.style.display = 'contents';
    } else {
      this.seleccionGeneracion.nativeElement.style.display = 'none';
      this.selectedCataloge.generation = '0';
    }
  }

  private updateTable({ value }: any, generacion: string = '0') {
    if (value == '798' || value == '708') {
      this.selectedGeneracion = generacion;
    } else {
      this.selectedGeneracion = undefined;
    }
    this.displaySubSelect(value);
  }
}
