import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './components/payment.component';
import { PaymentRoutingModule } from './payment.routes';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  exports: [
    PaymentComponent
  ],
  imports: [
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
