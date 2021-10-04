import { Component, OnInit } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import { PaginationInstance } from "ngx-pagination";
import { AddPaymentComponent } from "src/app/_components/add-payment/add-payment.component";
import { DeletePaymentComponent } from "src/app/_components/delete-payment/delete-payment.component";
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

  filterQuery: string = '';
  sortOptions: string[] = [];
  orderOptions: string[] = [];

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
        this.paginationConfig.itemsPerPage,
        this.filterQuery,
        this.sortOptions.toString(),
        this.orderOptions.toString(),
      )
      .subscribe((res: Payment[]) => {
        this.payments = res;
        this.paginationConfig.totalItems = res.length;
      });
  }

  toggleSortOrderOptions(option: string) {
    const index = this.sortOptions.indexOf(option);
    if (index > -1) {
      if (this.orderOptions[index] === 'desc') {
        this.sortOptions.splice(index, 1);
        this.orderOptions.splice(index, 1);
      } else {
        this.orderOptions[index] = 'desc';
      }
    } else {
      this.sortOptions.push(option);
      this.orderOptions.push('asc');
    }
    this.loadPayments();
  }

  getOptionOrderIcon(option: string) {
    const index = this.sortOptions.indexOf(option);
    if (index === -1) {
      return 'bi bi-arrow-down-up';
    } else {
      if (this.orderOptions[index] === 'desc') {
        return 'bi bi-arrow-down';
      } else {
        return 'bi bi-arrow-up';
      }
    }
  }

  changePage(pageNumber: number) {
    this.paginationConfig.currentPage = pageNumber;
    this.loadPayments();
  }

  changeItemsPerPage() {
    this.loadPayments();
  }

  toggleIsPayed(payment: Payment) {
    this.paymentService.editIsPayed(payment).subscribe(() => {
      this.loadPayments();
    });
  }

  showAddPaymentModal() {
    this.bsModalRef = this.modalService.show(AddPaymentComponent);
    this.bsModalRef.onHide.subscribe(() => {
      this.changePage(1);
    });
  }

  showEditPaymentModal(payment: Payment) {
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

  showDeletePaymentModal(payment: Payment) {
    const initialState: ModalOptions = {
      initialState: {
        payment: payment,
      },
    };
    this.bsModalRef = this.modalService.show(
      DeletePaymentComponent,
      initialState
    );
    this.bsModalRef.onHide.subscribe(() => {
      this.loadPayments();
    });
  }
}
