import { ScheduledPaymentsModule } from 'app/core/components/scheduled-payments/scheduled-payments.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MyPaymentsComponent } from './my-payments.component'
import { PoPageModule } from '@po-ui/ng-components'
import { PaymentModalModule } from 'app/shared/components/payment-modal/payment-modal.module'

@NgModule({
  declarations: [MyPaymentsComponent],
  imports: [CommonModule, ScheduledPaymentsModule, PoPageModule, PaymentModalModule]
})
export class MyPaymentsModule {}
