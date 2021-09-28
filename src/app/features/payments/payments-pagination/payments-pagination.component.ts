import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-payments-pagination',
  templateUrl: './payments-pagination.component.html'
})
export class PaymentsPaginationComponent {
  @Output() paginationClicked = new EventEmitter<number>();
  pageSelected = 1;

  constructor() {}

  onPaginationClick(pageSelected: number) {
    this.pageSelected = pageSelected;
    this.paginationClicked.emit(pageSelected);
  }

  onPreviousClick() {
    if (this.pageSelected === 1) {
      return;
    }

    this.pageSelected = this.pageSelected - 1;
    this.paginationClicked.emit(this.pageSelected);
  }

  onNextClick() {
    if (this.pageSelected === 5) {
      return;
    }

    this.pageSelected = this.pageSelected + 1;
    this.paginationClicked.emit(this.pageSelected);
  }
}
