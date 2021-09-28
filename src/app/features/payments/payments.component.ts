import { Component, OnInit } from '@angular/core';
import { Payment } from '@models/payments/payment.interface';
import { PaymentsService } from '@services/payments/payments.service';
import { Observable } from 'rxjs';

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

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit() {
    this.$paymentData = this.paymentsService.get(this.currentPage, '', '', '', this.limitRows);
  }

  changeLimit(value: string) {
    this.limitRows = Number(value);
    this.$paymentData = this.paymentsService.get(this.currentPage, '', '', '', this.limitRows);
  }

  addPayment() {
    console.log('add payment');
  }

  onEdit(payment: Payment) {
    console.log(payment);
  }

  onDelete(payment: Payment) {
    console.log(payment);
  }

  searchByName(search: string) {
    this.currentFilter = search;
    this.$paymentData = this.paymentsService.get(
      this.currentPage,
      this.currentFilter,
      this.currentSortOrder,
      this.currentSortField,
      this.limitRows
    );
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
}
