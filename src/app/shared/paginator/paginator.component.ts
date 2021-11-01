import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TaskDTO} from "../../core/DTO/taskDTO";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  nPages: number;
  nPageFor = [];
  activePage = 1;
  activeRow = 5;
  nRow = [5, 10, 20];
  @Input() tasks: TaskDTO[];
  @Output() taskPaginationEmit = new EventEmitter<TaskDTO[]>();
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.tasks) {
      this.emitPagination();
    }
  }

  changePage(page: number) {
    if (page > 0 && page <= this.nPages) {
      this.activePage = page;
    }
    this.emitPagination();
  }

  emitPagination() {
    this.nPages = this.tasks.length / this.activeRow;
    this.nPages = (this.nPages - parseInt(this.nPages.toString(), 10)) > 0 ?
        parseInt(this.nPages.toString(), 10) + 1 : this.nPages;
    this.nPageFor = new Array(this.nPages);
    const finalIndex = this.activePage * this.activeRow;
    const initialIndex = this.activePage > 1 ? (this.activePage - 1) * this.activeRow : 0;

    const pagination = this.tasks.slice(initialIndex, finalIndex);
    this.taskPaginationEmit.emit(pagination);
  }
}
