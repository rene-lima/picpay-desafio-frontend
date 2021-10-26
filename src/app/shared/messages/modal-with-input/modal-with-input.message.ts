import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'app-modal-with-input-message',
  templateUrl: 'modal-with-input.message.html',
})
export class ModalWithInput {
  constructor(public dialog: MatDialogRef<ModalWithInput>,
    @Inject(MAT_DIALOG_DATA) public data: any )  {}

  openDialog() {
    this.dialog.close();
  }

  delete() {
      this.dialog.close(true);
  }

  public formatDate(date) {
    return new Date(date).toLocaleString();
  }

}