import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';

=======
import { CommonModule, NgOptimizedImage } from "@angular/common";
>>>>>>> 4d81352aca7d65275047930844aa5acbd8b4b0fd
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
<<<<<<< HEAD
=======
    NgOptimizedImage,
>>>>>>> 4d81352aca7d65275047930844aa5acbd8b4b0fd
  ],
  exports: [MainPageComponent, RouterModule],
})
export class ShirtSaleModule {}
