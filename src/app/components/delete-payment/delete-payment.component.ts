import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss'],
  providers: [ PaymentService ]
})
export class DeletePaymentComponent implements OnInit {

  payment: Payment;

  constructor(private paymentService: PaymentService,
              private snackBar: MatSnackBar,
              private dialog: MatDialogRef<DeletePaymentComponent>,

              @Inject(MAT_DIALOG_DATA) public data: {paymentId: number}) { }

  getPaymentData(): void {
    this.paymentService.getPaymentById(this.data.paymentId)
        .subscribe(data => {
          this.payment = {...data};
        });
  }

  deletePayment(paymentId: number) {
    this.paymentService.deletePayment(paymentId)
      .subscribe(data => {
        this.snackBar.open('Operação realizada com sucesso!.', 'OK', {
          duration: 2000,
        });
      })
  }

  ngOnInit(): void {
    this.getPaymentData();
  }

}
