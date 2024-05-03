import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'pagares',
    loadChildren: () => import('./modules/pagares/pagares.module').then(m => m.PagaresModule)
  },
  {
    path: 'camp',
    loadChildren: () => import('./modules/camping/camping.module').then(m => m.CampingModule)
  },
  {
    path:'module-closed',
    loadComponent: ()=> import('./pages/modulo-cerrado/modulo-cerrado.component').then(c => c.ModuloCerradoComponent)

  }

];
