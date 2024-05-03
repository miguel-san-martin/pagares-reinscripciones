import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class SnackbarComponent {

  private _snackBar = inject(MatSnackBar)

  openSnackBar() {
    this._snackBar.open('Registro actualizado exitosamente', 'cerrar', {duration: 500});
  }

  errorSnackBar(){
    this._snackBar.open('Ha habido un error', 'Ok', {duration: 5000} )
  }


}
