import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(private sb: MatSnackBar) {}

  success(msg: string) {
    this.sb.open(msg, 'OK', { duration: 2500, panelClass: ['snack-success'] });
  }

  error(msg: string) {
    this.sb.open(msg, 'Cerrar', { duration: 3500, panelClass: ['snack-error'] });
  }
}
