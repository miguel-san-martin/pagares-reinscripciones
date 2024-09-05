import { Routes } from '@angular/router';
import { accesoEscolarConfGuard } from './guard/acceso-escolar-conf.guard';
import { GuardAccesoCirsos } from './modules/grupo-concurso-maestro/guard/guard-acceso.cirsos';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'concurso',
  },
  {
    path: 'module-closed',
    loadComponent: () =>
      import('./pages/modulo-cerrado/modulo-cerrado.component').then(
        (c) => c.ModuloCerradoComponent,
      ),
  },
  {
    path: 'no-permits',
    loadComponent: () =>
      import('./pages/no-permisos/no-permisos.component').then(
        (c) => c.NoPermisosComponent,
      ),
  },
  {
    path: 'login-screen',
    loadComponent: () =>
      import('./pages/login-screen/login-screen.component').then(
        (c) => c.LoginScreenComponent,
      ),
  },
  {
    path: 'concurso',
    canActivate: [GuardAccesoCirsos],
    loadChildren: () =>
      import(
        './modules/grupo-concurso-maestro/grupo-concurso-maestro.module'
      ).then((m) => m.GrupoConcursoMaestroModule),
  },
];
