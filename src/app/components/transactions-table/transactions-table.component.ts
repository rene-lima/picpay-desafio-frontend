import { Component, OnInit } from '@angular/core';

export interface TrasactionsProps {
  id: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image: string;
  isPayed: boolean;
}

export interface ColumnsProps {
  name: string;
}

const transactions: TrasactionsProps[] = [
  {
    id: 1,
    name: 'Kaua',
    username: 'kauagvs',
    title: 'Professor',
    value: 19.99,
    date: "2020-06-12T01:00:29Z",
    image: "https://robohash.org/utreiciendisdoloribus.png?size=150x150&set=set1",
    isPayed: true,
  },
  {
    id: 2,
    name: 'Semenov',
    username: 'Ksemenov',
    title: 'Programador 2',
    value: 454.22,
    date: "2020-09-27T10:59:29Z",
    image: "https://robohash.org/inventorepossimuslaboriosam.png?size=150x150&set=set1",
    isPayed: false,
  },
];

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})

export class TransactionsTableComponent implements OnInit {
  columns: ColumnsProps[] = [
    {name: 'Usuário'},
    {name: 'Título'},
    {name: 'Data'},
    {name: 'Valor'},
    {name: 'Pago'},
    {name: ''}
  ];

  transactions: TrasactionsProps[];

  constructor() {}

  ngOnInit(): void {
    this.transactions = transactions;
  }

  priceFormat(value) {
    const amount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);

    return amount;
  }
}
