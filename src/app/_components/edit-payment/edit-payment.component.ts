import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Payment } from "src/app/_models/payment/payment";
import { PaymentService } from "src/app/_services/payment/payment.service";

@Component({
  selector: "pf-edit-payment",
  templateUrl: "./edit-payment.component.html",
  styleUrls: ["./edit-payment.component.scss"],
})
export class EditPaymentComponent implements OnInit {
  payment: Payment = new Payment();

  constructor(
    public bsModalRef: BsModalRef,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    console.log(this.payment);
  }

  cancel() {
    this.bsModalRef.hide();
  }

  savePayment(paymentFormValue: any) {
    console.log(paymentFormValue);
    this.payment.title = paymentFormValue.title;
    this.payment.name = paymentFormValue.name;
    this.payment.username = paymentFormValue.username;
    this.payment.date = paymentFormValue.date;
    this.payment.value = +paymentFormValue.value;
    this.paymentService.editPayment(this.payment).subscribe(() => {
      this.bsModalRef.hide();
    });
  }
}
