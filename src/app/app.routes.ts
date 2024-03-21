import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'masiva',
    loadComponent: () => import('./pages/generador-masivo/generador-masivo.component').then(c => c.GeneradorMasivoComponent)
  },
  {
    path: 'especifica',
    loadComponent: () => import('./pages/generador-especifico/generador-especifico.component').then(c => c.GeneradorEspecificoComponent)
  },
];
