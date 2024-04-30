import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { MaterialModule } from './shared-material-module/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  activatedRoute = inject(ActivatedRoute);

  title = 'Contraloría';
  listModulos = [
    {
      nombre: 'Generación Masiva',
      isActive: true,
      path: './masiva',
    },
    {
      nombre: 'Configuración de Plazos de Pago',
      isActive: false,
      path: './config',
    },
  ];

}
