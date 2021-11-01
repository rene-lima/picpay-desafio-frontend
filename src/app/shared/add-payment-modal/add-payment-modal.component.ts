import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-payment-modal',
  templateUrl: './add-payment-modal.component.html',
  styleUrls: ['./add-payment-modal.component.scss']
})
export class AddPaymentModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPaymentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
