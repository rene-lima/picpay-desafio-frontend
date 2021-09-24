import { Component, OnInit, Input, Output, EventEmitter, ɵisObservable } from '@angular/core';

@Component({
  selector: 'payfriends-paginator',
  templateUrl: './payfriends-paginator.component.html',
  styleUrls: ['./payfriends-paginator.component.scss']
})
export class PayfriendsPaginatorComponent implements OnInit {
  @Output() previousPage = new EventEmitter()
  @Output() nextPage = new EventEmitter()
  @Output() changePage = new EventEmitter()
  @Output() changePageSize = new EventEmitter()
  @Input() currentPage = 1
  @Input() totalPages = 1
  @Input() totalItems = 1
  pageSizeOptions = [ 5, 10, 20]
  pageSize = 10
  pags = [ 1 ]
  constructor() { }

  ngOnInit(): void {
    this.pages()
  }
  setPageSize() {
    this.changePageSize.emit(this.pageSize)
  }
  setPreviousPage() {
    this.previousPage.emit()
  }
  setNextPage() {
    this.nextPage.emit()
  }
  setPage(page) {
    this.changePage.emit(page)
  
  }
  pages(): Array<any> {
    if (!this.currentPage) { return [] }
    const FIRST_PAGE = 1
    const SECOND_PAGE = 2
    const PENULTIMATE_PAGE = this.totalPages - 1

    if (this.currentPage === FIRST_PAGE) {
      return this.createPages(this.currentPage, this.currentPage + 4)
    }
    if (this.currentPage === SECOND_PAGE) {
      return this.createPages(this.currentPage - 1, this.currentPage + 3)
    }

    if (this.currentPage === this.totalPages) {
      return this.createPages(this.currentPage - 4, this.currentPage)
    }

    if (this.currentPage === PENULTIMATE_PAGE) {
      return this.createPages(this.currentPage - 3, this.currentPage + 1)
    }

    return this.createPages(this.currentPage - 2, this.currentPage + 2)
  }
  createPages(firstPage, lastPage) {
    const pages = []
    let i = Math.max(firstPage, 1)

    if (lastPage > this.totalPages) {
      lastPage = this.totalPages
    }

    while (i <= lastPage) {
      pages.push(i)
      i++
    }
    return pages
  }
}
