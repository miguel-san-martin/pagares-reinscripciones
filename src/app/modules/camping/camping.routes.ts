import { Routes } from "@angular/router";
import { VeranoCampamentoComponent } from "./pages/verano-campamento/verano-campamento.component";

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    component: VeranoCampamentoComponent
  }
/*   {
    path: '',
    redirectTo: '',
    pathMatch: 'full'

  } */
];
