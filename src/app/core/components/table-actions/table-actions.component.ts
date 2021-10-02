import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {
  @Output() clickedPageIndex = new EventEmitter<number>()

  @Input()
  set totalPaymentsLength({ value, perPage }: { value: number; perPage: number }) {
    this._totalPages = Math.ceil(value / perPage)
  }

  get pages(): number[] {
    return this._visiblePages
  }

  private _visiblePages: number[] = [1, 2, 3, 4, 5]
  private _totalPages: number = 0
  private currentPageIndexSelected = 1

  constructor() {}

  whenSelectPage(index: number): void {
    this.currentPageIndexSelected = index
    this.clickedPageIndex.emit(this.currentPageIndexSelected)
  }

  whenFirstPageSelected(): void {
    this.currentPageIndexSelected = 1
    this.clickedPageIndex.emit(1)
  }

  whenLastPageSelected(): void {
    this.currentPageIndexSelected = this._totalPages
    this.clickedPageIndex.emit(this._totalPages)
  }

  whenPreviousPageSelected(): void {
    if (this.currentPageIndexSelected === 1) return

    this.currentPageIndexSelected = this.currentPageIndexSelected - 1
    this.clickedPageIndex.emit(this.currentPageIndexSelected)
  }

  whenNextPageSelected(): void {
    if (this.currentPageIndexSelected + 1 > this._totalPages) return

    this.currentPageIndexSelected = this.currentPageIndexSelected + 1
    this.clickedPageIndex.emit(this.currentPageIndexSelected)
  }
}
