import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TaskDTO} from '../../core/DTO/taskDTO';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  nPages: number;
  nPageFor = [];
  arrayPage = 0;
  activePage = 1;
  activeRow = 5;
  nRow = [5, 10, 20];
  @Input() tasks: TaskDTO[];
  @Output() taskPaginationEmit = new EventEmitter<TaskDTO[]>();
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.countPages();
  }

  countPages() {
    if (this.tasks) {
      this.emitPagination();
      this.nPageFor = [];
      this.nPageFor.push(new Array());
      const aux = this.tasks.length / this.activeRow;
      let x = 0;
      if (aux >= 1) {
        for (let i = 0; i < aux; i++) {
          if (i % 5 === 0 && i > 4) {
            this.nPageFor.push(new Array());
            x += 1;
          }
          this.nPageFor[x].push(i);

        }
      } else {
        this.nPageFor[0].push(0);
      }
      this.arrayPage = 0;
    }
  }

  changePage(page: number) {

    if (page > 0 && page <= this.nPages) {
      this.activePage = page;
    }
    this.emitPagination();
  }
  changeRow(row: number) {
    this.activeRow = row;
    this.activePage = 1;
    this.arrayPage = 1;
    this.countPages();
  }

  emitPagination() {
    this.nPages = this.tasks.length / this.activeRow;
    this.nPages = (this.nPages - parseInt(this.nPages.toString(), 10)) > 0 ?
        parseInt(this.nPages.toString(), 10) + 1 : this.nPages;
    this.nextArrowPage(this.nPages);

    const finalIndex = this.activePage * this.activeRow;
    const initialIndex = this.activePage > 1 ? (this.activePage - 1) * this.activeRow : 0;

    const pagination = this.tasks.slice(initialIndex, finalIndex);
    this.taskPaginationEmit.emit(pagination);
  }

  nextArrowPage(pages: number) {
    if (this.nPageFor.length > 0) {
      if (this.nPageFor[this.arrayPage]) {
        (this.activePage - 1) > this.nPageFor[this.arrayPage][this.nPageFor[this.arrayPage].length - 1] ?
            this.arrayPage += 1 : null;
        (this.activePage - 1) < this.nPageFor[this.arrayPage][0] ? this.arrayPage -= 1 : null;
      }
    }
  }
}
