import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmBoxComponent } from 'app/confirm-box/confirm-box.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  openDialog() {
    return this.dialog.open(ConfirmBoxComponent, {
      width: '500px',
      disableClose: true,
      panelClass: 'confirm-dialog-container'
    });
  }
}
