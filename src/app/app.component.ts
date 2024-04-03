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

  title = 'pagares-reinscripciones';
  listModulos = [
    {
      nombre: 'Generacion Masiva',
      isActive: true,
      path: './masiva',
    },
    {
      nombre: 'Generacion Especifica',
      isActive: false,
      path: './especifica',
    },
    {
      nombre: 'Configuracion de Plazos',
      isActive: false,
      path: './config',
    },
  ];

}
