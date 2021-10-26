import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './components/payment.component';
import { PaymentRoutingModule } from './payment.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  exports: [
    PaymentComponent
  ],
  imports: [
    FormsModule,
    PaymentRoutingModule, 
    SharedModule
  ]
})
export class PaymentModule { }
