import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './shirt-sale.routes';
import { MaterialModule } from '../../shared-material-module/material.module';
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
    NgOptimizedImage,
  ],
  exports: [MainPageComponent, RouterModule],
})
export class ShirtSaleModule {}
