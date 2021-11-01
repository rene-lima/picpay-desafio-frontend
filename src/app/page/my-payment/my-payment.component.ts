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
  copyTasks: TaskDTO[];
  pagination: TaskDTO[];
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
          this.copyTasks = response;
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
        this.taskService.updateTask(data)
            .subscribe(response => {
                this.getTasks();
            });
    });
  }

  handlePagination(tasks: TaskDTO[]) {
    this.pagination = tasks;
  }

  searchInTable(query: string) {
      const paginationSearch =  new Array<TaskDTO>();
      console.log(query);
      if (query) {
          this.tasks.forEach((value, ind) => {
              const values = Object.values(value);
              const ocurrence = values.find(item => {
                  return item.toString().toLowerCase().search(query) !== - 1;
                  console.log(item.toString().toLowerCase().search(query) !== - 1)
                  console.log(item);
              });
              ocurrence ? paginationSearch.push(value) : null;
          });
          this.tasks = paginationSearch;
          console.log(this.pagination);
    } else {
          this.tasks = this.copyTasks;
      }
  }
}
