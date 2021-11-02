import { NgModule } from '@angular/core';

import { PaymentComponent } from './payment/payment.component';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { DeletePaymentComponent } from './delete-payment/delete-payment.component';
import { FilterPaymentComponent } from './filter-payment/filter-payment.component';


const ROUTES: Routes = [
  { path: '', component: PaymentComponent }
]

@NgModule({
  declarations: [
    PaymentComponent,
    AddPaymentComponent,
    DeletePaymentComponent,
    FilterPaymentComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})

export class PaymentsModule { }
