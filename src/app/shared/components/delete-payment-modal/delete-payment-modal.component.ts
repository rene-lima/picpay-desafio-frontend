import { Component, EventEmitter, Output, ViewChild } from '@angular/core'
import { PoModalAction, PoModalComponent } from '@po-ui/ng-components'
import { Payment } from 'app/core/entities/payment/payment.interface'
import { DeletePaymentService } from 'app/core/services/payments/delete-payment/delete-payment.service'

@Component({
  selector: 'app-delete-payment-modal',
  templateUrl: './delete-payment-modal.component.html',
  providers: [DeletePaymentService]
})
export class DeletePaymentModalComponent {
  @ViewChild(PoModalComponent, { static: true }) modal?: PoModalComponent

  @Output() paymentWasDeleted = new EventEmitter()

  paymentToBeDeleted?: Payment

  actions: PoModalAction[] = [
    { label: 'Salvar', action: () => this.deletePayment() },
    { label: 'Cancelar', action: () => this.close() }
  ]

  constructor(private readonly deletePaymentService: DeletePaymentService) {}

  open(payment: Payment): void {
    this.paymentToBeDeleted = payment
    this.modal?.open()
  }

  private close(): void {
    this.paymentToBeDeleted = undefined
    this.modal?.close()
  }

  private deletePayment(): void {
    this.deletePaymentService.Delete(this.paymentToBeDeleted.id.toString()).subscribe(() => {
      this.paymentWasDeleted.emit()
      this.close()
    })
  }
}
