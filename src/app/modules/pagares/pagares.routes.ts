import { Routes } from '@angular/router';
import { ConfiguracionGeneracionComponent } from './pages/configuracion-generacion/configuracion-generacion.component';
import { GeneradorEspecificoComponent } from './pages/generador-especifico/generador-especifico.component';
import { GeneradorMasivoComponent } from './pages/generador-masivo/generador-masivo.component';
import { accesoEscolarConfGuard } from '../../guard/acceso-escolar-conf.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'generador',
  },
  {
    path: 'generador',
    component: GeneradorMasivoComponent,
    canActivate: [accesoEscolarConfGuard],
  },
  {
    path: 'especific',
    component: GeneradorEspecificoComponent,
  },
  {
    path: 'config',
    component: ConfiguracionGeneracionComponent,
  },
];
