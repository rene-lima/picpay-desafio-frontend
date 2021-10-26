import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentItemModel } from 'src/app/shared/models/payment/payment-item.model';

/**
 * @title Injecting data when opening a dialog
 */
@Component({
    selector: 'app-item-modal-message',
    templateUrl: 'item-modal.message.html',
})
export class ItemModal {

    public item: PaymentItemModel;

    constructor(public dialog: MatDialogRef<ItemModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.item = new PaymentItemModel();
         }

    openDialog() {
        this.dialog.close();
    }
}