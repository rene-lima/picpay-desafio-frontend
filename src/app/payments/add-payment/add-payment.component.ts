import { PaymentsService } from './../payments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/model/tasks.model';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  title: string;
  payment: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private _paymentService: PaymentsService,
    public dialog: MatDialogRef<AddPaymentComponent>
  ) {
    this.title = this.data.title;
    if (this.data.task) {
      this.payment = this.data.task;
      this.payment.date = this.payment.date.toString().substr(0, 10);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.data.task) {
      //EDIT
      this._paymentService.editTask(this.payment).subscribe(response => {
        console.log(response);
      });
    }
    else {
      //CREATE
      let names = this.payment.name.trim().split(" ");
      //create username
      this.payment.username = this.payment.name.charAt(0).toLowerCase() + names[names.length - 1].toLowerCase();
      this.payment.image = "";
      this.payment.isPayed = false;
      this._paymentService.createTask(this.payment).subscribe(response => {
        console.log(response);
      });
    }

    let submit = true;
    this.dialog.close({ submit });
  }

}
