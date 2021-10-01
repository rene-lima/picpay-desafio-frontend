import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaymentModalComponent } from './payment-modal.component'
import { PoFieldModule, PoModalModule } from '@po-ui/ng-components'

@NgModule({
  declarations: [PaymentModalComponent],
  exports: [PaymentModalComponent],
  imports: [CommonModule, ReactiveFormsModule, PoModalModule, PoFieldModule]
})
export class PaymentModalModule {}
