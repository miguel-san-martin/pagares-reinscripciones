import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../../shared-material-module/material.module";
import { routes } from "../../app.routes";
import { SharedModule } from "@shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    [RouterModule]
  ]
})
export class PartidasPresupuestalesModule { }
