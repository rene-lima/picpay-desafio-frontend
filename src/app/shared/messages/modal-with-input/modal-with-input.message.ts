import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'app-alert-message',
  templateUrl: 'alert.message.html',
})
export class AlertMessage {
  constructor(public dialog: MatDialogRef<AlertMessage>,
    @Inject(MAT_DIALOG_DATA) public data: any )  {}

  openDialog() {
    this.dialog.close();
  }
}