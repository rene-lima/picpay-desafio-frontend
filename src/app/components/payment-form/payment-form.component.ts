import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  providers: [ PaymentService ],
})
export class PaymentFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private paymentService: PaymentService,
              private snackBar: MatSnackBar,
              private dialog: MatDialogRef<PaymentFormComponent>) { }
     
  @Output() formResponse: EventEmitter<any> = new EventEmitter<boolean>();

  payment: Payment;
  response: boolean = false;

  paymentForm = this.formBuilder.group({
    username: "",
    value: "",
    date: "",
    title: ""    
  });

  createPayment() {
    this.payment = {...this.paymentForm.value};

    this.paymentService.createPayment(this.payment)
      .subscribe(
        data => {
          
          this.snackBar.open('Operação realizada com sucesso!.', 'OK', {
            duration: 2000,
          });

          this.response = true;
          this.emitFormResponse(this.response);
        },
        error => {
          this.stopOperation();
          console.log('Error', error);
        }
      );
  }

  stopOperation() {
    
    this.snackBar.open('Operação cancelada.', 'OK', {
      duration: 3000,
    });
    this.emitFormResponse(this.response);
  }

  emitFormResponse(response: boolean): void {
    setTimeout(() => {
      this.formResponse.emit(response);
      this.dialog.close();
    }, 200)
  }

  ngOnInit(): void {
  }

}