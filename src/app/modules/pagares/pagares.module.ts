import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../shared-material-module/material.module';
import { ConfiguracionGeneracionComponent } from './pages/configuracion-generacion/configuracion-generacion.component';
import { routes } from './pagares.routes';
import { GeneradorMasivoComponent } from './pages/generador-masivo/generador-masivo.component';
import { SelectPagaresGeneracionComponent } from 'app/modules/pagares/components/select-pagares-generacion/select-pagares-generacion.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ConfiguracionGeneracionComponent,
    GeneradorMasivoComponent

  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterLink,
    RouterOutlet,
    SelectPagaresGeneracionComponent
  ],
  exports:[RouterModule]
})
export class PagaresModule {}
