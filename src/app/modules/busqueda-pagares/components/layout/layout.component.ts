import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CajaElectronicaComponent } from '../caja-electronica/caja-electronica.component';
import { CajaFisicaComponent } from '../caja-fisica/caja-fisica.component';
import { MaterialModule } from '../../../../shared-material-module/material.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CajaElectronicaComponent,
    CajaFisicaComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
