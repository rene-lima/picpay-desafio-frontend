import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PoButtonModule, PoFieldModule, PoInfoModule, PoTableModule } from '@po-ui/ng-components'
import { EditPaymentService } from 'app/core/services/payments/edit-payment/edit-payment.service'
import { GetPaymentsService } from 'app/core/services/payments/get-payments/get-payments.service'
import { PaymentModalModule } from 'app/shared/components/payment-modal/payment-modal.module'
import { PipesModule } from 'app/shared/pipes/pipes.module'
import { DeletePaymentModalModule } from './../../../shared/components/delete-payment-modal/delete-payment-modal.module'
import { TableActionsModule } from './../table-actions/table-actions.module'
import { ScheduledPaymentsComponent } from './scheduled-payments.component'

@NgModule({
  declarations: [ScheduledPaymentsComponent],
  exports: [ScheduledPaymentsComponent],
  imports: [
    CommonModule,
    PoTableModule,
    PoButtonModule,
    PoInfoModule,
    PoFieldModule,
    FormsModule,
    PipesModule,
    PaymentModalModule,
    DeletePaymentModalModule,
    TableActionsModule
  ],
  providers: [GetPaymentsService, EditPaymentService]
})
export class ScheduledPaymentsModule {}
