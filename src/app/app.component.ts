import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material-module/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pagares-reinscripciones';
  listModulos = [{
    nombre: 'Inicio',
    isActive: true,
    path: './pasoian'
  },
{
  nombre: 'Generacion Masiva',
  isActive: true,
  path: './pasoian'
},
{
  nombre: 'Generacion Especifica',
  isActive: false,
  path: './pasoian'
},
]
}
