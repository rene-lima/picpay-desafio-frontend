import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-payments-show-more',
  templateUrl: './payments-show-more.component.html'
})
export class PaymentsShowMoreComponent {
  @Output() changed = new EventEmitter<string>();

  constructor() {}

  onChange($event: Event) {
    this.changed.emit(($event.target as HTMLSelectElement).value);
  }
}
