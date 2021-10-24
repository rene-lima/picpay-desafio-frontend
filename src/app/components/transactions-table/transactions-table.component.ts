import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TrasactionsProps } from 'src/app/models/transaction.model';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TaskService } from 'src/app/services/task/task.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  @Output() refreshTransactionEmitter = new EventEmitter<boolean>();

  deleteModalTransaction: TrasactionsProps;

  modalTransaction: any;

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  transactionModalRef?: BsModalRef;
  @ViewChild('transactionModal') transactionModal;

  sub: Subscription[] = [];

  form: FormGroup;

  columns: ColumnsProps[] = [
    { name: 'Usuário' },
    { name: 'Título' },
    { name: 'Data' },
    { name: 'Valor' },
    { name: 'Pago' },
    { name: '' },
  ];

  constructor(
    private modalService: BsModalService,
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
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
    this.taskService
      .delete(id)
      .subscribe(() => this.refreshTransactionEmitter.emit(true));
    this.deleteModalRef?.hide();
  }

  onDeclineDelete() {
    this.deleteModalRef?.hide();
  }

  openModalTransaction(transaction?: TrasactionsProps) {
    this.form.patchValue({
      id: transaction.id,
      name: transaction.name,
      username: transaction.username,
      title: transaction.title,
      value: transaction.value,
      date: transaction.date,
      image: transaction.image,
      isPayed: transaction.isPayed,
    });

    this.transactionModalRef = this.modalService.show(this.transactionModal);
  }

  onDeclineTransaction() {
    this.transactionModalRef?.hide();
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.value.id) {
      this.taskService
        .update(this.form.value)
        .subscribe(() => this.refreshTransactionEmitter.emit(true));
    }
    this.transactionModalRef?.hide();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null],
      username: [null],
      title: [null],
      value: [null],
      date: [null],
      image: [null],
      isPayed: [null],
    });
  }
}
