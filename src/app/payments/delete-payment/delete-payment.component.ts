import { PaymentsService } from './../payments.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/shared/model/tasks.model';

@Component({
  selector: 'app-delete-payment',
  templateUrl: './delete-payment.component.html',
  styleUrls: ['./delete-payment.component.scss']
})
export class DeletePaymentComponent implements OnInit {

  payment: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private _paymentService: PaymentsService,
    public dialog: MatDialogRef<DeletePaymentComponent>
  ) {
    this.payment = data.task;
  }

  ngOnInit(): void {
  }

  onDelete() {
    this._paymentService.deleteTask(this.payment.id).subscribe(response => {

    });

    let submit = true;
    this.dialog.close({ submit });
  }

}
