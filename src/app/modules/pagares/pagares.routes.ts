import { Routes } from "@angular/router";
import { ConfiguracionGeneracionComponent } from "./pages/configuracion-generacion/configuracion-generacion.component";
import { GeneradorEspecificoComponent } from "./pages/generador-especifico/generador-especifico.component";
import { GeneradorMasivoComponent } from "./pages/generador-masivo/generador-masivo.component";


export const routes: Routes = [

  {
    path: 'generador',
    component: GeneradorMasivoComponent
  },
  {
    path: 'especific',
    component: GeneradorEspecificoComponent
  },
  {
    path: 'config',
    component: ConfiguracionGeneracionComponent
  }

];
