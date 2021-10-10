import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentFormComponent } from 'src/app/components/payment-form/payment-form.component';
import { PaymentListComponent } from 'src/app/components/payment-list/payment-list.component';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss']
})
export class PaymentViewComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  paymentList: PaymentListComponent;

  openCreatePaymentDialog(): void {
    this.dialog.open(PaymentFormComponent);
  }

  ngOnInit(): void {
  }

}
