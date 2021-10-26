import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertMessage } from 'src/app/shared/messages/alert/alert.message';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'titulo', 'data', 'valor', 'pago', 'acoes'];
  public dataSource: MatTableDataSource<PaymentItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private paymentService: PaymentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  public getPayments(): void {
    this.paymentService.getPayments().subscribe((res: Array<PaymentItem>) => {
      this.dataSource = new MatTableDataSource<PaymentItem>(res);
      this.dataSource.paginator = this.paginator;
    }, err => {
      if (err.status == 400) {
        this.dialog.open(AlertMessage, {
          width: '250px', data: { title: 'Ops, algo deu errado!', content: err.cerror[0] }
        });
      } else {
        console.log('Error -> ', err);
      }
    });
  }

  public formatDate(date) {
    return new Date(date).toLocaleString();
  }

  public delete() {
    
  }
}