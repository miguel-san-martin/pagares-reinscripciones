import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { GrupoconcursoService } from '../services/grupoconcurso.service';

export const GuardAccesoCirsos: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const myService = inject(GrupoconcursoService);

  return myService.GetCatalogos().pipe(
    tap((response: any) => {
      if (response.success === 2) {
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

        return router.navigate(['/login-screen']);
      }
      // if (response.parametros[0].error === '2') {
      //   console.error(
      //     '                           ,---.\n' +
      //       '                          /    |\n' +
      //       '                         /     |\n' +
      //       ' ¡N O  P A S A R Á S !  /      |\n' +
      //       '                       /       |\n' +
      //       "                 ___,'        |\n" +
      //       "                <  -'          :\n" +
      //       "                 `-.__..--'``-,__\n" +
      //       '                    |o/  o ` :,.)_`>\n' +
      //       '                    :/ `     ||/)\n' +
      //       '                    (_.).__,-` |\\\n' +
      //       '                    /( `.``   `| :\n' +
      //       "                    '`-.)  `  ; ;\n" +
      //       '                    | `       /-<\n' +
      //       '                    |     `  /   `.\n' +
      //       "    ,-_-..____     /|  `    :__..-'\\\n" +
      //       "   /,'-.__\\  ``-./ :`      ;       \\\n" +
      //       '   ` `  `\\   :  (   `  /  ,   `. \\\n' +
      //       '     `    \\   |  | `   :  :     . \\\n' +
      //       '       `_  ))  :  ;     |  |      ): :\n' +
      //       "     (`-.-' ||  |    ` ;  ;       | |\n" +
      //       '      -_   `;;._   ( `  /  /_       | |\n' +
      //       "       `-.-.// ,'`-.___/_,'         ; |\n" +
      //       '          :: :     /     `     ,   /  |\n' +
      //       "           || |    (        ,' /   /   |\n" +
      //       "           ||                ,'   /    |\n",
      //   );
      //   router.navigate(['/module-closed']);
      // } else if (response.parametros[0].error === '1') {
      //   router.navigate(['/no-permits']);
      // }
      return true;
    }),
  );
};
