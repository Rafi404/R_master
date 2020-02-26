import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

  constructor(public dialogref: MatDialogRef <ConfirmBoxComponent>) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogref.close(false);
  }

}
