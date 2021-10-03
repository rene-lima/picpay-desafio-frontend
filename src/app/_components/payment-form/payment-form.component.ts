import { formatDate } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Payment } from "src/app/_models/payment/payment";

@Component({
  selector: "pf-payment-form",
  templateUrl: "./payment-form.component.html",
  styleUrls: ["./payment-form.component.scss"],
})
export class PaymentFormComponent implements OnChanges {
  @Input() payment: Payment = new Payment();

  @Output()
  cancelEvent = new EventEmitter();

  @Output()
  saveEvent = new EventEmitter();

  paymentForm = this.fb.group({
    name: ["", Validators.required],
    username: ["", Validators.required],
    title: ["", Validators.required],
    date: ["", Validators.required],
    value: ["", Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    console.warn(this.payment)
    this.paymentForm.patchValue({
      name: this.payment.name,
      username: this.payment.username,
      title: this.payment.title,
      date: formatDate(this.payment.date, 'yyyy-MM-dd', 'pt-BR'),
      value: this.payment.value,
    });
  }

  cancel() {
    this.cancelEvent.emit();
  }

  save() {
    this.saveEvent.emit(this.paymentForm.value);
  }
}
