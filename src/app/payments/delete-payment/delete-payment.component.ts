import { Component, Inject, OnInit } from '@angular/core';
// Material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Component
import { MessageComponent } from 'src/app/shared/message/message.component';
// Service
import { PaymentsService } from './../payments.service';
// Model
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
    public dialog: MatDialog,
    private _paymentService: PaymentsService,
    public dialogRef: MatDialogRef<DeletePaymentComponent>
  ) {
    this.payment = data.task;
  }

  ngOnInit(): void {
  }

  // Save delete
  async onDelete() {
    await this._paymentService.deleteTask(this.payment.id).subscribe(
      resp => {
        const response = {
          title: "Pagamento excluído com sucesso!"
        };

        this.dialog.open(MessageComponent, { data: response });
      },
      error => {
        const response = {
          title: "Erro ao excluir novo pagamento!"
        };

        this.dialog.open(MessageComponent, { data: response });
      }
    );

    let submit = true;
    this.dialogRef.close({ submit });
  }

}
