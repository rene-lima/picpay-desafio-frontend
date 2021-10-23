import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrasactionsProps } from 'src/app/models/transaction/transaction.model';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  options: string[] = ['10', '20', '50', '100'];

  limit: number = 10;

  pager: any = {};

  pagedItems: TrasactionsProps[];

  totalItems: number;

  sub: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.sub.push(
      this.taskService.listAll().subscribe((response) => {
        this.totalItems = response.length;
        this.setPage(1);
      })
    );
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.paginationService.getPager(
      this.totalItems,
      page,
      this.limit
    );

    this.sub.push(
      this.taskService
        .listPage(this.pager.currentPage, this.limit)
        .subscribe((response) => {
          this.pagedItems = response;
        })
    );
  }

  setLimit() {
    this.pager = this.paginationService.getPager(
      this.totalItems,
      1,
      this.limit
    );
    this.sub.push(
      this.taskService
        .listPage(this.pager.currentPage, this.limit)
        .subscribe((response) => {
          this.pagedItems = response;
        })
    );
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
