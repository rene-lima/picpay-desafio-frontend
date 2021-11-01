import { PaymentsService } from './../payments.service';
import { AddPaymentComponent } from './../add-payment/add-payment.component';
import { DeletePaymentComponent } from './../delete-payment/delete-payment.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/shared/model/tasks.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'buttons'];
  dataSource: MatTableDataSource<Task>;
  payments: Task[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private _paymentService: PaymentsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.takeTasks();
  }

  ngOnInit(): void {
  }


  private takeTasks() {
    this._paymentService.getTasks().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });
  }

  openDialogAddPayment() {
    //open dialog   
    this.dialog.open(AddPaymentComponent, { width: '772px', data: { title: 'Adicionar pagamento' } })
      .afterClosed().subscribe(response => {
        response.submit ? this.takeTasks() : "";
      });
  }

  openDialogEditPayment(payment: Task) {
    //open dialog
    this.dialog.open(AddPaymentComponent, { width: '772px', data: { title: 'Editar pagamento', task: payment } })
      .afterClosed().subscribe(response => {
        response.submit ? this.takeTasks() : "";
      });
  }

  openDialogDeletePayment(payment: Task) {
    //open dialog
    this.dialog.open(DeletePaymentComponent, { width: '325px', data: { task: payment } })
      .afterClosed().subscribe(response => {
        response.submit ? this.takeTasks() : "";
      });
  }

  applyFilterPayments(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
