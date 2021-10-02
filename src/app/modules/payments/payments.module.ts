import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MyPaymentsModule } from './pages/my-payments/my-payments.module'
import { PaymentsRoutingModule } from './payments-routing.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, PaymentsRoutingModule, MyPaymentsModule]
})
export class PaymentsModule {}
