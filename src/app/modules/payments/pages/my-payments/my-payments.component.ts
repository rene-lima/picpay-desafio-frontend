import { PaymentModalComponent } from 'app/shared/components/payment-modal/payment-modal.component'
import { Component, ViewChild } from '@angular/core'
import { PoPageAction } from '@po-ui/ng-components'

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss']
})
export class MyPaymentsComponent {
  @ViewChild(PaymentModalComponent, { static: true }) modal?: PaymentModalComponent

  actions: PoPageAction[] = [{ label: 'Adicionar pagamento', action: () => this.createPayment() }]

  constructor() {}

  private createPayment(): void {
    this.modal?.open()
  }
}
