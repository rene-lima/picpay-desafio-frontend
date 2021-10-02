import { FormGroup, FormControl } from '@angular/forms'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {
  @Output() clickedPageIndex = new EventEmitter<number>()

  @Output() usernameToBeFiltered = new EventEmitter<string>()

  @Input()
  set totalPaymentsLength({ value, perPage }: { value: number; perPage: number }) {
    this._totalPages = Math.ceil(value / perPage)
  }

  get pages(): number[] {
    return this._visiblePages
  }

  form = new FormGroup({
    username: new FormControl(null)
  })

  private _visiblePages: number[] = [1, 2, 3, 4, 5]
  private _totalPages: number = 0
  private currentPageIndexSelected = 1

  constructor() {}

  whenChangeUsernameFilter(username: string): void {
    this.usernameToBeFiltered.emit(username)
  }

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
