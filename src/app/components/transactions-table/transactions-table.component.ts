import { Component, Input, OnInit } from '@angular/core';
import { TrasactionsProps } from 'src/app/models/transaction/transaction.model';

export interface ColumnsProps {
  name: string;
}

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent implements OnInit {
  @Input() transactions: TrasactionsProps[];

  columns: ColumnsProps[] = [
    { name: 'Usuário' },
    { name: 'Título' },
    { name: 'Data' },
    { name: 'Valor' },
    { name: 'Pago' },
    { name: '' },
  ];

  constructor() {}

  ngOnInit(): void {}

  priceFormat(value) {
    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return amount;
  }
}
