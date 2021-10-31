import { Component, OnInit } from '@angular/core';
import {TaskDTO} from '../../core/DTO/taskDTO';
import {TaskService} from '../../service/task/task.service';

@Component({
  selector: 'app-my-payment',
  templateUrl: './my-payment.component.html',
  styleUrls: ['./my-payment.component.scss']
})
export class MyPaymentComponent implements OnInit {
  page = 1;
  tasks: TaskDTO[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTask()
        .subscribe(response => {
          this.tasks = response;
        });
  }
}
