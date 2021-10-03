import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { PaginationInstance } from "ngx-pagination";
import { AddPaymentComponent } from "src/app/_components/add-payment/add-payment.component";
import { EditPaymentComponent } from "src/app/_components/edit-payment/edit-payment.component";
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

  bsModalRef?: BsModalRef;

  constructor(
    private paymentService: PaymentService,
    private modalService: BsModalService
  ) {}

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

  showAddPaymentModal() {
    this.bsModalRef = this.modalService.show(AddPaymentComponent);
    this.bsModalRef.onHide.subscribe(() => {
      this.changePage(1);
    });
  }

  showEditModalPayment(payment: Payment) {
    const initialState: ModalOptions = {
      initialState: {
        payment: payment,
      },
    };
    this.bsModalRef = this.modalService.show(
      EditPaymentComponent,
      initialState
    );
  }
}
