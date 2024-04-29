import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatoamdhhFormatodmaPipe } from './pipes/formatoamdhh-formatodma.pipe';
import { DineromxnPipe } from './pipes/dineromxn.pipe';
import { TablaContraloriaComponent } from './components/tabla-contraloria/tabla-contraloria.component';
import { PagoVerdeDirective } from './directives/directives.directive';
import { MaterialModule } from '../shared-material-module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DineromxnPipe,
    FormatoamdhhFormatodmaPipe,
    PagoVerdeDirective,
    TablaContraloriaComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule,
    FormsModule,ReactiveFormsModule],
  exports: [
    DineromxnPipe,
    FormatoamdhhFormatodmaPipe,
    FormsModule,
    PagoVerdeDirective,
    PagoVerdeDirective,
    ReactiveFormsModule,
    TablaContraloriaComponent,
  ],
})
export class SharedModule {}
