import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { PoSelectOption } from '@po-ui/ng-components'
import { Pagination } from 'app/core/entities/pagination/pagination.interface'

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent {
  @Output() selectedPaginationOptions = new EventEmitter<Pagination>()

  @Output() usernameToBeFiltered = new EventEmitter<string>()

  @Input()
  set totalPaymentsLength(value: number) {
    this._totalPaymentsLength = value
    this._totalPages = Math.ceil(value / this.form.get('perPage').value)
    this.calcVisiblePages()
  }

  get visiblePages(): number[] {
    return this._visiblePages
  }

  form = new FormGroup({
    username: new FormControl(null),
    perPage: new FormControl(5)
  })

  perPageOptions: PoSelectOption[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 }
  ]

  currentPageIndexSelected = 1

  private _visiblePages: number[]
  private _totalPages: number = 0
  private _totalPaymentsLength: number

  constructor() {}

  whenChangeUsernameFilter(username: string): void {
    this.usernameToBeFiltered.emit(username)
  }

  whenSelectPage(index: number): void {
    this.currentPageIndexSelected = index
    this.calcVisiblePages()
    this.selectedPaginationOptions.emit({
      pageIndex: this.currentPageIndexSelected,
      perPage: this.form.get('perPage').value
    })
  }

  whenFirstPageSelected(): void {
    this.currentPageIndexSelected = 1
    this.calcVisiblePages()
    this.selectedPaginationOptions.emit({
      pageIndex: 1,
      perPage: this.form.get('perPage').value
    })
  }

  whenLastPageSelected(): void {
    this.currentPageIndexSelected = this._totalPages
    this.calcVisiblePages()
    this.selectedPaginationOptions.emit({
      pageIndex: this._totalPages,
      perPage: this.form.get('perPage').value
    })
  }

  whenPreviousPageSelected(): void {
    if (this.currentPageIndexSelected === 1) return

    this.currentPageIndexSelected = this.currentPageIndexSelected - 1
    this.calcVisiblePages()
    this.selectedPaginationOptions.emit({
      pageIndex: this.currentPageIndexSelected,
      perPage: this.form.get('perPage').value
    })
  }

  whenNextPageSelected(): void {
    if (this.currentPageIndexSelected + 1 > this._totalPages) return

    this.currentPageIndexSelected = this.currentPageIndexSelected + 1
    this.calcVisiblePages()
    this.selectedPaginationOptions.emit({
      pageIndex: this.currentPageIndexSelected,
      perPage: this.form.get('perPage').value
    })
  }

  whenPerPageValueIsSelected(): void {
    this._totalPages = Math.ceil(this._totalPaymentsLength / this.form.get('perPage').value)

    this.whenFirstPageSelected()
  }

  private calcVisiblePages(): number[] {
    let pages = Array.from({ length: this._totalPages }, (_, i) => i + 1)

    if (this.currentPageIndexSelected < 5) {
      this._visiblePages = pages.slice(0, 5)
      return
    }

    if (this.currentPageIndexSelected === this._totalPages) {
      this._visiblePages = pages.slice(this._totalPages - 5, this._totalPages)
      return
    }

    this._visiblePages = pages.slice(this.currentPageIndexSelected - 2, this.currentPageIndexSelected + 3)
  }
}
