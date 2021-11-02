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
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {

  title: string;
  payment: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    public dialog: MatDialog,
    private _paymentService: PaymentsService,
    public dialogRef: MatDialogRef<AddPaymentComponent>
  ) {
    this.title = this.data.title;
    if (this.data.task) {
      this.payment = this.data.task;
      this.payment.date = this.payment.date.toString().substr(0, 10);
    } else {
      this.payment = {} as Task;
    }
  }

  ngOnInit(): void {
  }

  // Button Save Add Payment / Edit Payment
  async onSubmit() {
    if (this.data.task) {
      //EDIT
      await this._paymentService.editTask(this.payment).subscribe(
        resp => {
          const response = {
            title: "Pagamento editado com sucesso!"
          };

          this.dialog.open(MessageComponent, { data: response });
        },
        error => {
          const response = {
            title: "Erro ao editar pagamento!"
          };

          this.dialog.open(MessageComponent, { data: response });
        }
      );
    }
    else {
      //CREATE
      let names = this.payment.name.trim().split(" ");
      //create username
      this.payment.username = this.payment.name.charAt(0).toLowerCase() + names[names.length - 1].toLowerCase();
      this.payment.image = "";
      this.payment.isPayed = false;
      await this._paymentService.createTask(this.payment).subscribe(
        resp => {
          const response = {
            title: "Pagamento criado com sucesso!"
          };

          this.dialog.open(MessageComponent, { data: response });
        },
        error => {
          const response = {
            title: "Erro ao cadastrar novo pagamento!"
          };

          this.dialog.open(MessageComponent, { data: response });
        }
      );
    }

    let submit = true;
    this.dialogRef.close({ submit });
  }

}
