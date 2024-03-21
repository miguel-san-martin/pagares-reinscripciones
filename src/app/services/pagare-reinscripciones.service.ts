import { Injectable } from '@angular/core';
import { interval, startWith, tap, map, takeWhile, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagareReinscripcionesService {

  constructor() { }

  startTiemer(){
    const observable = interval(1000).pipe(
      // Empezar desde 10
      take(100),
      // Incrementar el valor en 10 cada vez que se emita un valor
      map(value => (value + 1) * 5),
      tap( () => {console.log} ),
      // Tomar solo los valores hasta llegar a 100
      takeWhile(value => value <= 100)
    );

    return observable;
  }
}
