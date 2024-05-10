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

  @Output()
  public emitSelectedOption: EventEmitter<SelectedPagareGeneracion> =
    new EventEmitter();

  @Output()
  public showPanel: EventEmitter<boolean> =
    new EventEmitter();

  public listaCatalogos!: Catalogo[]; //Lista de Catalogos
  public listaGeneraciones!: GeneracionesResponse[]; //Lista de Generaciones

  public selectedCataloge: SelectedPagareGeneracion = {
    catalog: null,
    generation: null,
  };

  ngOnInit(): void {

    this.Service.GetCatalogosOperaciones().subscribe((response: Catalogo[]) => {
      this.listaCatalogos = response;
    });

    this.Service.GetCatalogosGeneraciones().subscribe((response: GeneracionesResponse[]) => {
      this.listaGeneraciones = response;
    });
  }

  public onSelectPagare() {

    if(Number(this.selectedCataloge.catalog) === 798 || Number(this.selectedCataloge.catalog) === 708){
      this.selectedCataloge.generation = null;
      this.seleccionGeneracion.nativeElement.style.display = 'contents';
      this.showPanel.emit(false)

    } else{
      this.selectedCataloge.generation = '0';
      this.seleccionGeneracion.nativeElement.style.display = 'none';
      this.emitSelectedOption.emit(this.selectedCataloge)
      this.showPanel.emit(true)
    }

  }

  public onSelectGeneration() {

    this.emitSelectedOption.emit(this.selectedCataloge)
    this.showPanel.emit(true)

  }

  // Si es un pagare tipo Impulsa - 798 o 708 Vertice se mostrara un select con #genereacion como referencia

}
