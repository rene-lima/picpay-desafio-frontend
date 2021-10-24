import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TrasactionsProps } from 'src/app/models/transaction.model';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TaskService } from 'src/app/services/task/task.service';
import { Subscription } from 'rxjs';

export interface ColumnsProps {
  name: string;
}

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent implements OnInit, OnDestroy {
  @Input() transactions: TrasactionsProps[];
  @Output() refreshTransactionEmitter = new EventEmitter<boolean>();

  deleteModalTransaction: TrasactionsProps;

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  sub: Subscription[] = [];

  columns: ColumnsProps[] = [
    { name: 'Usuário' },
    { name: 'Título' },
    { name: 'Data' },
    { name: 'Valor' },
    { name: 'Pago' },
    { name: '' },
  ];

  constructor(private modalService: BsModalService, private taskService: TaskService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

  priceFormat(value) {
    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return amount;
  }

  openModalDelete(transaction: TrasactionsProps) {
    this.deleteModalTransaction = transaction;
    this.deleteModalRef = this.modalService.show(this.deleteModal);
  }

  onConfirmDelete(id: number) {
    this.sub.push(
      this.taskService.delete(id).subscribe(() => this.refreshTransactionEmitter.emit(true))
    );
    this.deleteModalRef?.hide();
  }

  onDeclineDelete() {
    this.deleteModalRef?.hide();
  }

}
