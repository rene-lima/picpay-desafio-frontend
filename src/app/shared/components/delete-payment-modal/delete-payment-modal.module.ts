import { PoModalModule } from '@po-ui/ng-components'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DeletePaymentModalComponent } from './delete-payment-modal.component'
import { PipesModule } from 'app/shared/pipes/pipes.module'
import { DeletePaymentService } from 'app/core/services/payments/delete-payment/delete-payment.service'

@NgModule({
  declarations: [DeletePaymentModalComponent],
  exports: [DeletePaymentModalComponent],
  imports: [CommonModule, PoModalModule, PipesModule],
  providers: [DeletePaymentService]
})
export class DeletePaymentModalModule {}
