import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/shared-material-module/material.module';
import { NgModule } from '@angular/core';
import { PrecioDependienteComponent } from './components/precio-dependiente/precio-dependiente.component';
import { PrecioExternoComponent } from './components/precio-externo/precio-externo.component';
import { PreciosExtraComponent } from './components/precios-extra/precios-extra.component';
import { RouterModule } from '@angular/router';
import { routes } from './camping.routes';
import { SharedModule } from '@shared/shared.module';
import {
  DialogAnimationsExampleDialog,
  VeranoCampamentoComponent,
} from './pages/verano-campamento/verano-campamento.component';

@NgModule({
  declarations: [
    VeranoCampamentoComponent,
    DialogAnimationsExampleDialog,
    PrecioDependienteComponent,
    PrecioExternoComponent,
    PreciosExtraComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule],
})
export class CampingModule {}
