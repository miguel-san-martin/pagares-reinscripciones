import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AdministraConfiguracionService } from '../modules/admin-config-configuracion/administra-configuracion.service';
import { tap } from 'rxjs';
import { PagareReinscripcionesService } from '../modules/pagares/services/pagare-reinscripciones.service';

export const accesoEscolarConfGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const myService = inject(PagareReinscripcionesService);

  return myService.GetCatalogosOperaciones().pipe(
    tap((response: any) => {
      if (response['success'] === 2) {
        console.log('!!');
        return router.navigate(['/login-screen']);
      }
      if (0) {
        console.error(
          '                           ,---.\n' +
            '                          /    |\n' +
            '                         /     |\n' +
            ' ¡N O  P A S A R Á S !  /      |\n' +
            '                       /       |\n' +
            "                 ___,'        |\n" +
            "                <  -'          :\n" +
            "                 `-.__..--'``-,__\n" +
            '                    |o/  o ` :,.)_`>\n' +
            '                    :/ `     ||/)\n' +
            '                    (_.).__,-` |\\\n' +
            '                    /( `.``   `| :\n' +
            "                    '`-.)  `  ; ;\n" +
            '                    | `       /-<\n' +
            '                    |     `  /   `.\n' +
            "    ,-_-..____     /|  `    :__..-'\\\n" +
            "   /,'-.__\\  ``-./ :`      ;       \\\n" +
            '   ` `  `\\   :  (   `  /  ,   `. \\\n' +
            '     `    \\   |  | `   :  :     . \\\n' +
            '       `_  ))  :  ;     |  |      ): :\n' +
            "     (`-.-' ||  |    ` ;  ;       | |\n" +
            '      -_   `;;._   ( `  /  /_       | |\n' +
            "       `-.-.// ,'`-.___/_,'         ; |\n" +
            '          :: :     /     `     ,   /  |\n' +
            "           || |    (        ,' /   /   |\n" +
            "           ||                ,'   /    |\n",
        );
        router.navigate(['/module-closed']);
      } else if (0) {
        router.navigate(['/no-permits']);
      }
      return true;
    }),
  );
};
