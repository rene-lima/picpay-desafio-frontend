import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  tap,
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { TrasactionsProps } from 'src/app/models/transaction/transaction.model';
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

  queryField = new FormControl();
  limit = new FormControl(10);

  constructor(
    private taskService: TaskService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.sub.push(
      this.taskService.listAll().subscribe((response) => {
        this.transactions = response;
        this.totalItems = response.length;
        this.setPage(1);
      })
    );
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
          })
      );
    }
  }

  setPage(page: number) {
    let limit = this.limit.value;

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.paginationService.getPager(
      this.totalItems,
      page,
      limit
    );

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

    this.pager = this.paginationService.getPager(
      this.totalItems,
      1,
      limit
    );

    this.sub.push(
      this.taskService
        .listPage(this.pager.currentPage, limit)
        .subscribe((response) => {
          this.pagedItems = response;
          this.queryField.setValue('');
        })
    );
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
