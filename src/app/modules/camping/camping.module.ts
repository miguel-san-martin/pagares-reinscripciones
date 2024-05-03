import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAnimationsExampleDialog, VeranoCampamentoComponent } from './pages/verano-campamento/verano-campamento.component';
import { MaterialModule } from 'app/shared-material-module/material.module';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [VeranoCampamentoComponent,DialogAnimationsExampleDialog],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class CampingModule { }
