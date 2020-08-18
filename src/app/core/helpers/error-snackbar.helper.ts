import { MatSnackBar } from '@angular/material/snack-bar';

export class ErrorSnackbarHelper {

  static showErrorSnackbar(snackbar: MatSnackBar, error: string): void {
    snackbar.open(`⚠️${error}`, null, {
      panelClass: ['error-snackbar'],
      duration: 4000
    });
  }

}
