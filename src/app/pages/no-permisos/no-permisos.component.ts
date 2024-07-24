import { Component, inject } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { CampamentoIestService } from "../../modules/camping/services/campamento-iest.service";
import { BehaviorSubject, tap } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-permisos',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './no-permisos.component.html',
  styleUrl: './no-permisos.component.scss',
})
export class NoPermisosComponent {
  Service = inject(CampamentoIestService);
  Router = inject(Router);

  mensaje$ = new BehaviorSubject<string>(
    'El módulo no se encuentra disponible por el momento.',
  );

  checkService(): void {
    this.Service.GetPeriods()
      .pipe(
        tap((response) => {
          console.log('entrada');
          if (Array.isArray(response)) {
            this.Router.navigateByUrl('/');
          }
        }),
      )
      .subscribe();
  }}
