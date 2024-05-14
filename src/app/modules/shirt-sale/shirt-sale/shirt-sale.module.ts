import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './shirt-sale.routes';
import { MaterialModule } from './../../../shared-material-module/material.module';
import { SharedModule } from '@shared/shared.module';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterLink,
    RouterOutlet,
  ],
  exports: [MainPageComponent, RouterModule],
})
export class ShirtSaleModule {}
/*https://material.angular.io/components/datepicker/overview#input-and-change-events*/
