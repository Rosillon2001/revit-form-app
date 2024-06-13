import { Injectable } from '@angular/core';
// Mat snackbar
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  // snack bar state
  public showSnackBar: boolean = false;

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  // show snackbar
  show(message: string, action: string, duration: number, panelClass: string) {
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}
