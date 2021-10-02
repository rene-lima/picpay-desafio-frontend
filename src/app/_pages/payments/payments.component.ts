import { Component, OnInit } from "@angular/core";
import { PaginationInstance } from "ngx-pagination";
import { PaginationConfig } from "src/app/_interfaces/pagination-config";
import { Payment } from "src/app/_models/payment/payment";
import { PaymentService } from "src/app/_services/payment/payment.service";

@Component({
  selector: "pf-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  paginationConfig: PaginationInstance = {
    id: "payments-pagination",
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 170, // TODO: trocar para carregamento dinâmico
  };

  qtOptions: number[] = [5, 10, 15];

  payments: Payment[] = [];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService
      .getPayments(
        this.paginationConfig.currentPage,
        this.paginationConfig.itemsPerPage
      )
      .subscribe((res: Payment[]) => {
        this.payments = res;
      });
  }

  changePage(pageNumber: number) {
    this.paginationConfig.currentPage = pageNumber;
    this.loadPayments();
  }

  changeItemsPerPage() {
    this.loadPayments();
  }
}
