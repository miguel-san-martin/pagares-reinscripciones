import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageConsultaComponent } from './page-consulta/page-consulta.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../shared-material-module/material.module';
import { SharedModule } from '@shared/shared.module';
import { routes } from './concurso-maestro.routes';

@NgModule({
  declarations: [PageConsultaComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterLink,
    RouterOutlet,
  ],
  exports: [RouterModule],
})
export class GrupoConcursoMaestroModule {}
