import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl } from '@angular/forms';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DeletePaymentComponent } from '../delete-payment/delete-payment.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  providers: [PaymentService],
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements AfterViewInit {

  paymentList: Payment[];
  filteredPaymentList: Payment[];
  dataSource: MatTableDataSource<Payment>;
  displayedColumns: string[] = ["user", "title", "date", "value", "isPayed", "actions"];

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterForm = this.formBuilder.group({
    filter: new FormControl(''),
  })

  ngAfterViewInit(): void {
    this.getListPayment();
  }

  filterByUsername(): void {
    this.filteredPaymentList = this.paymentList.filter((payment) => {
      const filter: string = this.filterForm.value.filter

      return payment.name.includes(filter) || payment.username.includes(filter)
    })

    this.dataSource = new MatTableDataSource<Payment>(this.filteredPaymentList);
  }

  getListPayment(): void {
    this.paymentService.getPayments()
        .subscribe(data => {
          this.paymentList = [...data];
          this.dataSource = new MatTableDataSource<Payment>(this.paymentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          console.log("err", err)
        })
  }

  editPayment(paymentId: Number) {
    const dialogRef = this.dialog.open(PaymentFormComponent, {data: {edit: true, paymentId}});
    dialogRef.afterClosed().subscribe(() => {
      this.getListPayment();
    })
  }

  deletePayment(paymentId: Number) {
    const dialogRef = this.dialog.open(DeletePaymentComponent, {data: {paymentId}});
    dialogRef.afterClosed().subscribe(() => {
      this.getListPayment();
    })
  }
}
