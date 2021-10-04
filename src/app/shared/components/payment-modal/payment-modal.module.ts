import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaymentModalComponent } from './payment-modal.component'
import { PoFieldModule, PoModalModule } from '@po-ui/ng-components'
import { CreatePaymentService } from 'app/core/services/payments/create-payment/create-payment.service'
import { EditPaymentService } from 'app/core/services/payments/edit-payment/edit-payment.service'

@NgModule({
  declarations: [PaymentModalComponent],
  exports: [PaymentModalComponent],
  imports: [CommonModule, ReactiveFormsModule, PoModalModule, PoFieldModule],
  providers: [CreatePaymentService, EditPaymentService]
})
export class PaymentModalModule {}
