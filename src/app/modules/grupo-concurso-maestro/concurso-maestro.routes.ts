import { Routes } from '@angular/router';
import { PageConsultaComponent } from './page-consulta/page-consulta.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'concursos-maestro',
  },
  {
    path: 'concursos-maestro',
    component: PageConsultaComponent,
    // canActivate: [accesoEscolarConfGuard],
  },
];
