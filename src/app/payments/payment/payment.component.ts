import { FilterPaymentComponent } from './../filter-payment/filter-payment.component';
import { PaymentsService } from './../payments.service';
import { AddPaymentComponent } from './../add-payment/add-payment.component';
import { DeletePaymentComponent } from './../delete-payment/delete-payment.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/shared/model/tasks.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MessageComponent } from 'src/app/shared/message/message.component';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private _paymentService: PaymentsService,
    public _MatPaginatorIntl: MatPaginatorIntl
  ) {
    this.takeTasks();
  }

  ngOnInit(): void {
    this._MatPaginatorIntl.itemsPerPageLabel = 'Exibir:';
  }


  private async takeTasks() {
    await this._paymentService.getTasks().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        const response = {
          title: "Erro ao buscar pagamentos!"
        };

        this.dialog.open(MessageComponent, { data: response });
      }
    );
  }

  //open dialog create
  openDialogAddPayment() {
    this.dialog.open(AddPaymentComponent, { width: '772px', data: { title: 'Adicionar pagamento' } })
      .afterClosed().subscribe(response => {
        response.submit ? this.takeTasks() : "";
      });
  }

  //open dialog edit
  openDialogEditPayment(payment: Task) {
    this.dialog.open(AddPaymentComponent, { width: '772px', data: { title: 'Editar pagamento', task: payment } })
      .afterClosed().subscribe(response => {
        response.submit ? this.takeTasks() : "";
      });
  }

  //open dialog delete
  openDialogDeletePayment(payment: Task) {
    this.dialog.open(DeletePaymentComponent, { width: '325px', data: { task: payment } })
      .afterClosed().subscribe(response => {
        response.submit ? this.takeTasks() : "";
      });
  }

  //applu filter in table payments 
  applyFilterPayments(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //open dialog button filter
  openDialogFilterPayment() {
    this.dialog.open(FilterPaymentComponent, { width: '325px', height: '290px' });
  }

}
