import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pagares',
    loadChildren: () =>
      import('./modules/pagares/pagares.module').then((m) => m.PagaresModule),
  },
  {
    path: 'camp',
    loadChildren: () =>
      import('./modules/camping/camping.module').then((m) => m.CampingModule),
  },
  {
    path: 'shirt-sale',
    loadChildren: () =>
      import('./modules/shirt-sale/shirt-sale.module').then(
        (m) => m.ShirtSaleModule,
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
    path: 'partidas-presupuestales',
    loadComponent: () =>
      import('./modules/partidas-presupuestales/pages/partidas-presupuestales-main-page/partidas-presupuestales-main-page.component').then(
        (c) => c.PartidasPresupuestalesMainPageComponent,
      ),
  },
  {
    path: 'module-closed',
    loadComponent: () =>
      import('./pages/modulo-cerrado/modulo-cerrado.component').then(
        (c) => c.ModuloCerradoComponent,
      ),
  },
];
