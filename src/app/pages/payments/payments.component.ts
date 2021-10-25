import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { TrasactionsProps } from 'src/app/models/transaction.model';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit, OnDestroy {
  transactions: TrasactionsProps[];

  options: string[] = ['10', '20', '50', '100'];

  pager: any = {};

  pagedItems: TrasactionsProps[];

  totalItems: number;

  sub: Subscription[] = [];

  form: FormGroup;

  openTransactionModal: boolean = false;

  queryField = new FormControl();
  limit = new FormControl(10);

  transactionModalRef?: BsModalRef;
  @ViewChild('transactionModal') transactionModal;

  constructor(
    private taskService: TaskService,
    private paginationService: PaginationService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAll();
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

  onSearch() {
    let user = this.queryField.value;
    let limit = this.limit.value;

    if (user) {
      user = user.toUpperCase();

      this.pagedItems = this.transactions.filter(
        (transaction) => transaction.username.toUpperCase().indexOf(user) >= 0
      );

      this.pager = this.paginationService.getPager(
        this.pagedItems.length,
        1,
        limit
      );
    } else {
      this.sub.push(
        this.taskService
          .listPage(this.pager.currentPage, limit)
          .subscribe((response) => {
            this.pagedItems = response;
            this.queryField.setValue('');
            this.setPage(1);
          })
      );
    }
  }

  setPage(page: number) {
    let limit = this.limit.value;

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.paginationService.getPager(this.totalItems, page, limit);

    this.sub.push(
      this.taskService
        .listPage(this.pager.currentPage, limit)
        .subscribe((response) => {
          this.pagedItems = response;
          this.queryField.setValue('');
        })
    );
  }

  setLimit() {
    let limit = this.limit.value;

    this.pager = this.paginationService.getPager(this.totalItems, 1, limit);

    this.sub.push(
      this.taskService
        .listPage(this.pager.currentPage, limit)
        .subscribe((response) => {
          this.pagedItems = response;
          this.queryField.setValue('');
        })
    );
  }

  refresh() {
    this.getAll();
  }

  getAll() {
    this.sub.push(
      this.taskService.listAll().subscribe((response) => {
        this.transactions = response;
        this.totalItems = response.length;
        this.setPage(1);
      })
    );
  }

  openModalTransaction() {
    this.transactionModalRef = this.modalService.show(this.transactionModal);
  }

  onDeclineTransaction() {
    this.transactionModalRef?.hide();
  }

  onSubmit() {
    let user = this.form.value;
    user.name = user.username;
    this.taskService.create(this.form.value).subscribe(() => this.refresh() );
    this.transactionModalRef?.hide();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null],
      username: [null],
      title: [null],
      value: [null],
      date: new FormControl(new Date()),
      image: [null],
      isPayed: [false],
    });
  }
}
