import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskDTO} from "../../core/DTO/taskDTO";

@Component({
  selector: 'app-delete-payment-modal',
  templateUrl: './delete-payment-modal.component.html',
  styleUrls: ['./delete-payment-modal.component.scss']
})
export class DeletePaymentModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePaymentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TaskDTO) { }

  ngOnInit(): void {
  }

  emitPayment() {
    this.dialogRef.close(this.data.id);
  }
}
