import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  providers: [PaymentService],
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements AfterViewInit {

  paymentList: Payment[];
  dataSource: MatTableDataSource<Payment>;
  displayedColumns: string[] = ["user", "title", "date", "value", "isPayed"];

  constructor(private paymentService: PaymentService) { }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.getListPayment();
  }

  getListPayment(): void {
    this.paymentService.getPayments()
        .subscribe(data => {
          this.paymentList = [...data];
          this.dataSource = new MatTableDataSource<Payment>(this.paymentList);
          this.dataSource.paginator = this.paginator;
        }, err => {
          console.log("err", err)
        })
  }

}
