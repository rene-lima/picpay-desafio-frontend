import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IsDateService} from "../../service/is-date/is-date.service";
import * as moment from "moment";
import {TaskDTO} from "../../core/DTO/taskDTO";

@Component({
  selector: 'app-add-payment-modal',
  templateUrl: './add-payment-modal.component.html',
  styleUrls: ['./add-payment-modal.component.scss']
})
export class AddPaymentModalComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddPaymentModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TaskDTO,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.data) {
      this.form = this.formBuilder.group({
        user: [this.data.name, [Validators.required]],
        value: [this.data.value, [Validators.required]],
        date: [moment(this.data.date).toISOString(), [Validators.required, IsDateService.validateDate]],
        title: [this.data.title, [Validators.required]]
      });
    } else {
      this.form = this.formBuilder.group({
        user: ['', [Validators.required]],
        value: [null, [Validators.required]],
        date: ['', [Validators.required, IsDateService.validateDate]],
        title: ['', [Validators.required]]
      });
    }
  }

  emitPayment() {
    let data: TaskDTO;
    if (this.data) {
      data = {
        username: this.data.username,
        name: this.form.get('user').value,
        date: moment(this.data.date).isSame(moment(this.form.get('date').value)) ?
            moment(this.data.date).toISOString()
        :
            moment(this.form.get('date').value).add(moment.duration(moment().format('hh:mm:ss'))).toISOString(),
        title: this.form.get('title').value,
        value: this.form.get('value').value,
        isPayed: this.data.isPayed,
        id: this.data.id,
        image: this.data.image
      };
    } else {
      data = {
        username: this.form.get('user').value,
        name: this.form.get('user').value,
        date: moment(this.form.get('date').value).add(moment.duration(moment().format('hh:mm:ss'))).toString(),
        title: this.form.get('title').value,
        value: this.form.get('value').value,
        isPayed: false,
        id: 0,
        image: ''
      };
    }
    this.dialogRef.close(data);
  }
}
