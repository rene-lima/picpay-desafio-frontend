import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
              private dialog: MatDialogRef<PaymentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {edit: boolean, paymentId: number}) {
                const update = this.data?.edit;  

                if (update) {
                  this.getPayment(this.data.paymentId);
                } else {
                  this.paymentForm = this.formBuilder.group({
                    username: "",
                    value: "",
                    date: "",
                    title: "",
                    isPayed: "",   
                  });
                }
              }
     
  @Output() formResponse: EventEmitter<any> = new EventEmitter<boolean>();

  paymentForm: FormGroup;
  payment: Payment;
  response: boolean = false;

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

  getPayment(paymentId: number) { 
    this.paymentService.getPaymentById(paymentId).subscribe(data => {
      this.payment = {...data};

      this.paymentForm = this.formBuilder.group({
        username: this.data.edit ? this.payment.username : "",
        value: this.data.edit ? this.payment.value : "",
        date: this.data.edit ? this.payment.date : "",
        title: this.data.edit ? this.payment.title : "",
        isPayed: this.data.edit ? this.payment.isPayed : "",   
      });
    });
  }

  editPayment() {
    this.payment = {...this.payment, ...this.paymentForm.value}; 

    this.paymentService.editPayment(this.payment)
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