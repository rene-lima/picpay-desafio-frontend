import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrasactionsProps } from 'src/app/models/transaction/transaction.model';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  
  transactions: TrasactionsProps[];

  options: string[] = ['10', '20', '50'];

  sub: Subscription;


  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.sub = this.taskService.list().subscribe((response) => {
      this.transactions = response;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
