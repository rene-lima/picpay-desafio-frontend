import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IsDateService} from "../../service/is-date/is-date.service";
import * as moment from "moment";

@Component({
  selector: 'app-add-payment-modal',
  templateUrl: './add-payment-modal.component.html',
  styleUrls: ['./add-payment-modal.component.scss']
})
export class AddPaymentModalComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddPaymentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      value: [null, [Validators.required]],
      date: ['', [Validators.required, IsDateService.validateDate]],
      title: ['', [Validators.required]]
    });
  }

  emitPayment() {
    const data = {
      username: this.form.get('user').value,
      name: this.form.get('user').value,
      date: moment(this.form.get('date').value).add(moment.duration(moment().format('hh:mm:ss'))),
      title: this.form.get('title').value,
      value: this.form.get('value').value,
      isPayed: false,
      id: 0,
      image: ''
    };
    this.dialogRef.close(data);
  }
}
