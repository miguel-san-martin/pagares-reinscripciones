import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material-module/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

  }

  activatedRoute = inject(ActivatedRoute);

  title = 'Módulo de Impresión Pagares para Reinscripción';
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

click(){
  console.log('0');

}
}
