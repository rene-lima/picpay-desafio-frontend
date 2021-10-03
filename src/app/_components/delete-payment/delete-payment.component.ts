import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Payment } from "src/app/_models/payment/payment";
import { PaymentService } from "src/app/_services/payment/payment.service";

@Component({
  selector: "pf-delete-payment",
  templateUrl: "./delete-payment.component.html",
  styleUrls: ["./delete-payment.component.scss"],
})
export class DeletePaymentComponent implements OnInit {
  payment: Payment = new Payment();

  constructor(
    public bsModalRef: BsModalRef,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.bsModalRef.hide();
  }

  deletePayment() {
    this.paymentService.deletePayment(this.payment).subscribe(() => {
      this.bsModalRef.hide();
    });
  }
}
