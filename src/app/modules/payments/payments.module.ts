import { MyPaymentsModule } from 'app/modules/payments/pages/my-payments/my-payments.module'
import { HeaderModule } from 'app/core/components/header/header.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaymentsComponent } from './payments.component'
import { PaymentsRoutingModule } from './payments-routing.module'

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule, PaymentsRoutingModule, HeaderModule, MyPaymentsModule]
})
export class PaymentsModule {}
