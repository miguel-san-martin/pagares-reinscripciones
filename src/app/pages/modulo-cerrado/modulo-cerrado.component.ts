import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CampamentoIestService } from 'app/modules/camping/services/campamento-iest.service';
import { MaterialModule } from 'app/shared-material-module/material.module';

/**
 * Este componente se muestra cuando el usuario no cuenta con los permisos
 * adecuados para cargar el módulo o este no se encuentra abierto por diversos
 * motivos.
 */
@Component({
  selector: 'app-modulo-cerrado',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './modulo-cerrado.component.html',
  styleUrls: ['./modulo-cerrado.component.scss'],
})
export class ModuloCerradoComponent {
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
  }
}
