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
  task: TaskDTO;

  constructor(private taskService: TaskService,
              public modalAddPayment: MatDialog) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTask()
        .subscribe(response => {
          this.tasks = response;
        });
  }
  openModal() {
    const modalRef = this.modalAddPayment.open(AddPaymentModalComponent);

    modalRef.afterClosed().subscribe((data: TaskDTO ) => {
        this.taskService.addTask(data)
            .subscribe(response => {
              this.getTasks();
            });
    });
  }
  editPayment(task: TaskDTO) {
    const modalRef = this.modalAddPayment.open(AddPaymentModalComponent, { data: task });

    modalRef.afterClosed().subscribe((data: TaskDTO) => {
        console.log(data);
        this.taskService.updateTask(data)
            .subscribe(response => {
                this.getTasks();
            });
    });
  }
}
