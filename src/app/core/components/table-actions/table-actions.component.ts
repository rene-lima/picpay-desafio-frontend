import { FormGroup, FormControl } from '@angular/forms'
import { Component, EventEmitter, Input, Output } from '@angular/core'
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
    this._totalPages = Math.ceil(value / this.form.get('perPage').value)
  }

  get pages(): number[] {
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

  private _visiblePages: number[] = [1, 2, 3, 4, 5]
  private _totalPages: number = 0
  private currentPageIndexSelected = 1

  constructor() {}

  whenChangeUsernameFilter(username: string): void {
    this.usernameToBeFiltered.emit(username)
  }

  whenSelectPage(index: number): void {
    this.currentPageIndexSelected = index
    this.selectedPaginationOptions.emit({
      pageIndex: this.currentPageIndexSelected,
      perPage: this.form.get('perPage').value
    })
  }

  whenFirstPageSelected(): void {
    this.currentPageIndexSelected = 1
    this.selectedPaginationOptions.emit({
      pageIndex: 1,
      perPage: this.form.get('perPage').value
    })
  }

  whenLastPageSelected(): void {
    this.currentPageIndexSelected = this._totalPages
    this.selectedPaginationOptions.emit({
      pageIndex: this._totalPages,
      perPage: this.form.get('perPage').value
    })
  }

  whenPreviousPageSelected(): void {
    if (this.currentPageIndexSelected === 1) return

    this.currentPageIndexSelected = this.currentPageIndexSelected - 1
    this.selectedPaginationOptions.emit({
      pageIndex: this.currentPageIndexSelected,
      perPage: this.form.get('perPage').value
    })
  }

  whenNextPageSelected(): void {
    if (this.currentPageIndexSelected + 1 > this._totalPages) return

    this.currentPageIndexSelected = this.currentPageIndexSelected + 1
    this.selectedPaginationOptions.emit({
      pageIndex: this.currentPageIndexSelected,
      perPage: this.form.get('perPage').value
    })
  }

  whenPerPageValueIsSelected(): void {
    this.selectedPaginationOptions.emit({
      pageIndex: this.currentPageIndexSelected,
      perPage: this.form.get('perPage').value
    })
  }
}
