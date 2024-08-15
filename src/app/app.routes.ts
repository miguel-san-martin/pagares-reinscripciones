import { Routes } from '@angular/router';
import { accesoEscolarConfGuard } from './guard/acceso-escolar-conf.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pagares',
  },
  {
    path: 'pagares',
    loadChildren: () =>
      import('./modules/pagares/pagares.module').then((m) => m.PagaresModule),
  },
  {
    path: 'module-closed',
    loadComponent: () =>
      import('./pages/modulo-cerrado/modulo-cerrado.component').then(
        (c) => c.ModuloCerradoComponent,
      ),
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
];
