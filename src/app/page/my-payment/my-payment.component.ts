import { Component, OnInit } from '@angular/core';
import {TaskDTO} from '../../core/DTO/taskDTO';
import {TaskService} from '../../service/task/task.service';
import {MatDialog} from "@angular/material/dialog";
import {AddPaymentModalComponent} from "../../shared/add-payment-modal/add-payment-modal.component";

@Component({
  selector: 'app-my-payment',
  templateUrl: './my-payment.component.html',
  styleUrls: ['./my-payment.component.scss']
})
export class MyPaymentComponent implements OnInit {
  page = 1;
  tasks: TaskDTO[];

  constructor(private taskService: TaskService,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.taskService.getTask()
        .subscribe(response => {
          this.tasks = response;
        });
  }

  openModal() {
    this.matDialog.open(AddPaymentModalComponent);
  }
}
