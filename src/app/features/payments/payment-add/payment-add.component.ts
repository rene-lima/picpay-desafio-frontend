import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Payment } from '@models/payments/payment.interface';
import { PaymentsService } from '@services/payments/payments.service';

import { PaymentAddFormComponent } from './payment-add-form/payment-add-form.component';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html'
})
export class PaymentAddComponent implements OnInit {
  paymentAddForm: FormGroup;
  touched = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentsService,
    public dialogRef: MatDialogRef<PaymentAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) this.isEditing = true;
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit({ value, valid }: { value: Payment; valid: boolean }) {
    this.touched = true;
    if (valid) {
      if (this.isEditing) {
        this.paymentService.edit(this.data.id, value).subscribe((_) => {
          this.buildForm();
          this.touched = false;

          this.dialogRef.close();
        });
      }

      this.paymentService.create(value).subscribe((_) => {
        this.buildForm();
        this.touched = false;

        this.dialogRef.close();
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  buildForm() {
    console.log(this.data);
    this.paymentAddForm = this.fb.group({
      username: [this.data?.username ? this.data.username : '', [Validators.required]],
      value: [this.data?.value ? this.data.value : '', Validators.required],
      date: [formatDate(this.data?.date ? this.data.date : new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      title: this.data?.title ? this.data.title : ''
    });
  }
}
