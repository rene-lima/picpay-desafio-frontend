import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-payments-filter',
  templateUrl: './payments-filter.component.html'
})
export class PaymentsFilterComponent {
  @Output() filtered = new EventEmitter<string>();

  constructor() {}

  onFilter(search: HTMLInputElement) {
    this.filtered.emit(search.value);
  }
}
