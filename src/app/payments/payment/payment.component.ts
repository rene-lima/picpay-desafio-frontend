import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/shared/model/tasks.model';

// Components
import { FilterPaymentComponent } from './../filter-payment/filter-payment.component';
import { AddPaymentComponent } from './../add-payment/add-payment.component';
import { DeletePaymentComponent } from './../delete-payment/delete-payment.component';
import { MessageComponent } from 'src/app/shared/message/message.component';

// Services
import { PaymentsService } from './../payments.service';

// Material 
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'buttons'];
  dataSource: MatTableDataSource<Task>;
  payments: Task[];
  innerWidth: any;
  filters = {} as any;
  disableButton = false;

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

  // Take tasks api  
  private async takeTasks() {
    await this._paymentService.getTasks().subscribe(
      response => {
        this.payments = response;
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

  //apply filter in table payments 
  applyFilterPayments(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //open dialog button filter
  openDialogFilterPayment() {
    this.dialog.open(FilterPaymentComponent, { width: '400px' }).afterClosed().subscribe(response => {
      this.filters = response.filter ? response.filter : {};
      if (this.filters) {
        this.disableButton = true;
      } else {
        this.disableButton = false;
      }
      this.moreFilters();
    });
  }

  moreFilters() {
    let paymentsFilter = this.payments;
    if (this.filters.start) {
      paymentsFilter = paymentsFilter.filter(payment => new Date(payment.date) >= this.filters.start && new Date(payment.date) <= this.filters.end);
    }
    if (this.filters.maxValue && this.filters.maxValue !== 0) {
      paymentsFilter = paymentsFilter.filter(payment => payment.value <= this.filters.maxValue);
    }
    if ((this.filters.isPayed === false && this.filters.isNotPayed === false) || (this.filters.isPayed === true && this.filters.isNotPayed === true)) {
    } else {
      if (this.filters.isPayed) {
        paymentsFilter = paymentsFilter.filter(payment => payment.isPayed);
      }
      else if (this.filters.isNotPayed) {
        paymentsFilter = paymentsFilter.filter(payment => !payment.isPayed);
      }
    }

    this.dataSource = new MatTableDataSource(paymentsFilter);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  clearFilters() {
    let paymentsFilter = this.payments;
    this.dataSource = new MatTableDataSource(paymentsFilter);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.disableButton = false;
  }

}
