import {
  Component,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { forkJoin, map, tap } from 'rxjs';
import { PrecioDependienteComponent } from '../../components/precio-dependiente/precio-dependiente.component';
import { PrecioExternoComponent } from '../../components/precio-externo/precio-externo.component';
import { PreciosExtraComponent } from '../../components/precios-extra/precios-extra.component';
import { Cataloge } from '../../interfaces/devnull/catalogo';
import { ResponseEditabilityPeriode } from '../../interfaces/responses/response-editability-periode';
import { ResponseExtraFee } from '../../interfaces/responses/response-extra-fee';
import { ResponseGetFee } from '../../interfaces/responses/response-get-fee';
import { ResponseIdDescont } from '../../interfaces/responses/response-mother-child-price';
import { SelectedCatalog } from '../../interfaces/selected-catalog';
import { CampamentoIestService } from '../../services/campamento-iest.service';


@Component({
  templateUrl: './verano-campamento.component.html',
  styleUrl: '../../../../shared/scss/custom-template-miguel-v2.scss',
})
export class VeranoCampamentoComponent implements OnInit {

  Service = inject(CampamentoIestService);
  dialog = inject(MatDialog);


  public formIsVisible: boolean = false;
  public formIsNotGenerated!: ResponseEditabilityPeriode | null;
  public priceIsEditable: boolean = true;


  public externalPriceData!:ResponseGetFee[];
  public childishPriceData!:ResponseIdDescont[];
  public maternalPriceData!:ResponseIdDescont[];
  public extraPriceData!: ResponseExtraFee[] ;
  public catalogesList!: Cataloge[];
  public selectedCatalog!: string;
  public precioExternoIsCorrect :boolean =false;
  public showDebugButton: boolean = false;



  ngOnInit(): void {
    if(!environment.production){
      this.showDebugButton = true;
    }
    //Obtenemos los periodos
    this.Service.GetPeriods().subscribe((value: SelectedCatalog[]) => {
      this.catalogesList = value;
    });

  }

  // Metodo disparado tras seleccionar un periodo
  $emitSelectedCatalog(idPeriodo: string) {
    const editableObservable = this.Service.CheckIfIsEditable(idPeriodo);

    editableObservable.pipe(
      //? Originalmente el store me llega en array, lo convierto
      map(
        array => array[0]
      ),
      tap(console.log)
    ).subscribe(
      ({estatus, existe, msj, idRegistro}: ResponseEditabilityPeriode) => {

        //? INFO: Estatus: No Capturado, Cerrado y PermiteCambios.
        //? Existe: 0 que no se ha generado y 1 que ya esta generado.
        //? Id registro sirve para poder mandar a llamar el endpoint para cerrar el periodo.


        const flags:string[] = ['No Capturado', 'PermiteCambioAs'];
        this.priceIsEditable = flags.includes(estatus);

        this.formIsNotGenerated = {
          estatus,
          existe,
          msj,
          idRegistro
        }
        this.Service.thePeriodIsClosed = {
          estatus,
          existe,
          idRegistro,
          msj,
          idPeriodo: idPeriodo
        }

        //? Oculta el formulario si no se ha generado.
        if (existe === '0') this.formIsVisible = false;


        this.getPrecios(idPeriodo);
      },
    );
  }

  getPrecios(idPrecio: string) {
    const observables = [
      this.Service.GetBaseFee(idPrecio),
      this.Service.GetChildishPrices(idPrecio),
      this.Service.GetMaternalPrices(idPrecio),
      this.Service.GetAdditionalCosts(idPrecio),
    ];
    forkJoin(observables).subscribe(
      ([baseFee, childPrices, maternalPrices, additionalCosts]):void => {

        this.externalPriceData = baseFee as ResponseGetFee[];
        this.childishPriceData = childPrices as ResponseIdDescont[];
        this.maternalPriceData = maternalPrices as ResponseIdDescont[];
        this.extraPriceData    = additionalCosts as ResponseExtraFee[];

        this.formIsVisible = this.formIsNotGenerated?.existe !== '0';
      },
    );
  }


  //? SÍ: Generar nuevo año
  $generateNewPeriod() {
    this.formIsVisible = false;
    this.Service.GenerateMigrationNewPeriod(this.selectedCatalog).subscribe({
      next: () => {
        this.formIsVisible = true;
        this.$emitSelectedCatalog(this.selectedCatalog);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {

      }
    }
    );
  }

  //? NO: Generar periodo volver a cargar la pagina.
  $reloadPage() {
    window.location.reload();
  }


  @ViewChild(PrecioExternoComponent)externo!: PrecioExternoComponent;
  @ViewChild(PreciosExtraComponent)extra!: PreciosExtraComponent;
  @ViewChildren(PrecioDependienteComponent)dependientes!: QueryList<PrecioDependienteComponent>;

  $openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef:MatDialogRef<DialogAnimationsExampleDialog> = this.dialog.open(DialogAnimationsExampleDialog, {
      data:{},
      width: '40%',
      enterAnimationDuration,
      exitAnimationDuration,

    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if(result == 'yes')
        this.closePeriods();
    })

  }

  //? Funcion llamada para cerrar de los formularios en la vista
  closePeriods(){
    this.externo.cerrarPeriodo();
    this.extra.closePeriode();
    this.dependientes.forEach(child => child.cerrarPeriodo());
    this.priceIsEditable = false;
    this.getPrecios(this.selectedCatalog)
  }

  externalIsIncorrect() {
    this.extra.closePeriode();
    this.dependientes.forEach(child => child.cerrarPeriodo());
  }

  externalIsCorrect(){
    this.extra.closePeriode();
    this.dependientes.forEach(child => child.openPeriodo());
  }

  //! Solo dev, borra el periodo actual y pone Existe en 0
  borrarGeneradoDev() {

    console.log('Borrado periodo', this.selectedCatalog);

    this.Service.deleteGeneration(this.selectedCatalog).subscribe((r) => {
      window.location.reload();
    });
  }

}



//? Pone
@Component({
  templateUrl: 'dialog.html',
})
export class DialogAnimationsExampleDialog {

  Service = inject(CampamentoIestService);

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>
  ) {}

  closePeriod(){
    const idRegistro = this.Service.thePeriodIsClosed?.idRegistro;
    this.Service.closePeriod(idRegistro).subscribe(
      (respose)=> {
        console.warn('El periodo se ha cerrado')
      }
    )

    this.dialogRef.close('yes');
    }

  }

