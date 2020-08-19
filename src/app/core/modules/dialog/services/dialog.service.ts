import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DeleteDialogConfig } from '../models/delete-dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) {}

  showDeleteDialog(title: string): Observable<boolean> {
    const dialog = this.dialog.open<DeleteDialogComponent, DeleteDialogConfig, boolean>(DeleteDialogComponent, {
      data: {title}
    });
    return dialog.afterClosed();
  }

}
