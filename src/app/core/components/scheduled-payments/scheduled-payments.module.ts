import { TableActionsModule } from './../table-actions/table-actions.module'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { PoButtonModule, PoFieldModule, PoInfoModule, PoTableModule } from '@po-ui/ng-components'
import { PaymentModalModule } from 'app/shared/components/payment-modal/payment-modal.module'
import { PipesModule } from 'app/shared/pipes/pipes.module'
import { DeletePaymentModalModule } from './../../../shared/components/delete-payment-modal/delete-payment-modal.module'
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
  ]
})
export class ScheduledPaymentsModule {}
