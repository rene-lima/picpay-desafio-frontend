import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentsService } from '@services/payments/payments.service';

@Component({
  selector: 'app-payment-delete',
  templateUrl: './payment-delete.component.html'
})
export class PaymentDeleteComponent {
  constructor(
    private paymentService: PaymentsService,
    public dialogRef: MatDialogRef<PaymentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onDelete() {
    this.paymentService.delete(this.data.id).subscribe((_) => {
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
