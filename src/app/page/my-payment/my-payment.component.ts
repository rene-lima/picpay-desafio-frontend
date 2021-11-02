import { Component, OnInit } from '@angular/core';
import {TaskDTO} from '../../core/DTO/taskDTO';
import {TaskService} from '../../service/task/task.service';
import {MatDialog} from '@angular/material/dialog';
import {AddPaymentModalComponent} from '../../shared/add-payment-modal/add-payment-modal.component';
import {DeletePaymentModalComponent} from '../../shared/delete-payment-modal/delete-payment-modal.component';

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
    sortState = {
        name: false,
        title: false,
        date: false,
        value: false,
        isPayed: false,
    };

    sortingPage = {
        textAndValue: (property: string) => {
            this.sortState[property] = !this.sortState[property];
            if (this.sortState[property]) {
                const sortedPage = this.pagination.sort((a, b) => {
                    if (a[property] > b[property]) {
                        return 1;
                    } else {
                        return -1;
                    }
                    return 0;
                });
                return sortedPage;
            } else {
                const sortedPage = this.pagination.sort((a, b) => {
                    if (a[property] < b[property]) {
                        return 1;
                    } else {
                        return -1;
                    }
                    return 0;
                });
                return sortedPage;
            }
        },
        date: (property: string) => {
            this.sortState[property] = !this.sortState[property];
            if (this.sortState[property]) {
                const sortedPage = this.pagination.sort((a, b) => {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                });
                return sortedPage;
            } else {
                const sortedPage = this.pagination.sort((a, b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                return sortedPage;
            }
        }
  };

  constructor(private taskService: TaskService,
              public modalPayment: MatDialog) { }

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
  openModalAddPayment() {
    const modalRef = this.modalPayment.open(AddPaymentModalComponent);

    modalRef.afterClosed().subscribe((data: TaskDTO ) => {
        this.taskService.addTask(data)
            .subscribe(response => {
              this.getTasks();
            });
    });
  }
  editPayment(task: TaskDTO) {
    const modalRef = this.modalPayment.open(AddPaymentModalComponent, { data: task });

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
      if (query) {
          this.tasks.forEach((value, ind) => {
              const values = Object.values(value);
              const ocurrence = values.find(item => {
                  return item.toString().toLowerCase().search(query) !== - 1;
              });
              ocurrence ? paginationSearch.push(value) : null;
          });
          this.tasks = paginationSearch;
    } else {
          this.tasks = this.copyTasks;
      }
  }

  deletePayment(task: TaskDTO) {
      const modalRef = this.modalPayment.open(DeletePaymentModalComponent, { data: task });

      modalRef.afterClosed().subscribe(data => {
          this.taskService.deleteTask(data)
              .subscribe(reponse => {
                  this.getTasks();
              });
      });
  }

  organizer(property: string) {
    if (property !== 'date') {
        this.pagination = this.sortingPage.textAndValue(property);
    } else {
        this.pagination = this.sortingPage.date(property);
    }
  }

}
