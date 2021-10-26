import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertMessage } from 'src/app/shared/messages/alert/alert.message';
import { ItemModal } from 'src/app/shared/messages/form/payment/item-modal.message';
import { ModalWithInput } from 'src/app/shared/messages/modal-with-input/modal-with-input.message';
import { PaymentItemModel } from 'src/app/shared/models/payment/payment-item.model';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'titulo', 'data', 'valor', 'pago', 'acoes'];
  public dataSource: MatTableDataSource<PaymentItemModel>;
  public listItens: Array<PaymentItemModel>;
  public bkpListItens: Array<PaymentItemModel>;
  public textTofilter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private paymentService: PaymentService,
    public dialog: MatDialog
  ) {
    this.listItens = new Array<PaymentItemModel>();
    this.bkpListItens = new Array<PaymentItemModel>();
    this.textTofilter = '';
  }

  ngOnInit(): void {
    this.getPayments();
  }

  public getPayments(): void {
    this.paymentService.getPayments().subscribe((res: Array<PaymentItemModel>) => {
      this.listItens = res;
      this.bkpListItens = JSON.parse(JSON.stringify(res));
      this.dataSource = new MatTableDataSource<PaymentItemModel>(res);
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

  public delete(item: PaymentItemModel) {

    const dialogRef = this.dialog.open(ModalWithInput, {
      width: '350px', data: { title: 'Excluir pagamento', content: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let index = this.listItens.indexOf(item);
        this.listItens.splice(index, 1);
        this.dataSource = new MatTableDataSource<PaymentItemModel>(this.listItens);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  public add() {

    const dialogRef = this.dialog.open(ItemModal, {
      width: '350px', data: { title: 'Adicionar Usuário' }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  public filter() {


    console.log('sasa');
    this.listItens = this.bkpListItens;

    this.listItens = this.listItens.filter(x =>
      x.username.toLocaleLowerCase().includes(this.textTofilter.toLocaleLowerCase()) ||
      x.title.toLocaleLowerCase().includes(this.textTofilter.toLocaleLowerCase()) ||
      x.value.toString().includes(this.textTofilter));

    this.dataSource = new MatTableDataSource<PaymentItemModel>(this.listItens);
    this.dataSource.paginator = this.paginator;

  }
}