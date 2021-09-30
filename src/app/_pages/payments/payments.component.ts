import { Component, OnInit } from "@angular/core";
import { PaginationConfig } from "src/app/_interfaces/pagination-config";
import { Payment } from "src/app/_models/payment/payment";
import { PaymentService } from "src/app/_services/payment/payment.service";

@Component({
  selector: "pf-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    limit: 5,
  };

  payments: Payment[] = [];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService
      .getPayments(
        this.paginationConfig.currentPage,
        this.paginationConfig.limit
      )
      .subscribe((res: Payment[]) => {
        this.payments = res;
      });
  }
}
