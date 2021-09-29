import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Payment } from '@models/payments/payment.interface';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent {
  @Input() payments: Payment[] | null;
  @Output() edited = new EventEmitter<Payment>();
  @Output() deleted = new EventEmitter<Payment>();
  @Output() sorted = new EventEmitter<string>();
  @Output() payedChanged = new EventEmitter<{ id: number; isPayed: boolean }>();

  colsHeader: { header: string; sort: string }[] = [
    { header: 'Usuário', sort: 'name' },
    { header: 'Título', sort: 'title' },
    { header: 'Data', sort: 'date' },
    { header: 'Valor', sort: 'value' },
    { header: 'Pago', sort: 'isPayed' }
  ];

  constructor() {}

  onEdit($event: Payment) {
    this.edited.emit($event);
  }

  onDelete($event: Payment) {
    this.deleted.emit($event);
  }

  onSort(sortName: string) {
    this.sorted.emit(sortName);
  }

  payedChange(rowId: number, event: Event) {
    this.payedChanged.emit({ id: rowId, isPayed: (event.target as HTMLInputElement).checked });
  }
}
