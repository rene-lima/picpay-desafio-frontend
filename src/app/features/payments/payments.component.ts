import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Payment } from '@models/payments/payment.interface';
import { PaymentsService } from '@services/payments/payments.service';
import { Observable } from 'rxjs';

import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentDeleteComponent } from './payment-delete/payment-delete.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html'
})
export class PaymentsComponent implements OnInit {
  $paymentData: Observable<Payment[]>;
  currentPage = 1;
  currentFilter = '';
  currentSortField = '';
  currentSortOrder: 'desc' | 'asc' = 'desc';
  limitRows = 5;

  constructor(private paymentsService: PaymentsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.$paymentData = this.paymentsService.get(this.currentPage, '', '', '', this.limitRows);
  }

  changeLimit(value: string) {
    this.limitRows = Number(value);
    this.$paymentData = this.paymentsService.get(this.currentPage, '', '', '', this.limitRows);
  }

  addPayment() {
    this.dialog.open(PaymentAddComponent);
  }

  onEdit(payment: Payment) {
    const dialogRef = this.dialog.open(PaymentAddComponent, { data: payment });

    this.onDialogClose<PaymentAddComponent>(dialogRef);
  }

  onDelete(payment: Payment) {
    const dialogRef = this.dialog.open(PaymentDeleteComponent, { data: payment });

    this.onDialogClose<PaymentDeleteComponent>(dialogRef);
  }

  searchByName(search: string) {
    this.currentFilter = search;
    this.$paymentData = this.paymentsService.filterByName(this.currentFilter);
  }

  onSort(sortField: string) {
    this.currentSortField = sortField;
    this.currentSortOrder = this.currentSortOrder == 'desc' ? 'asc' : 'desc';

    this.$paymentData = this.paymentsService.get(
      this.currentPage,
      '',
      this.currentSortOrder,
      this.currentSortField,
      this.limitRows
    );
  }

  onPageChange(pageSelected: number) {
    this.currentPage = pageSelected;
    this.$paymentData = this.paymentsService.get(
      this.currentPage,
      '',
      this.currentSortOrder,
      this.currentSortField,
      this.limitRows
    );
  }

  onPaymentChanged({ id, isPayed }: { id: number; isPayed: boolean }) {
    this.paymentsService.editPaymentStatus(id, isPayed).subscribe((response) => console.log(response));
  }

  onDialogClose<T>(dialogRef: MatDialogRef<T>) {
    dialogRef.afterClosed().subscribe((_) => {
      this.$paymentData = this.paymentsService.get(this.currentPage, '', '', '', this.limitRows);
    });
  }
}
