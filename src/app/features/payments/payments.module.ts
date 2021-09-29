import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { PaymentAddFormComponent } from './payment-add/payment-add-form/payment-add-form.component';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentDeleteComponent } from './payment-delete/payment-delete.component';
import { PaymentsFilterComponent } from './payments-filter/payments-filter.component';
import { PaymentsPaginationComponent } from './payments-pagination/payments-pagination.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsShowMoreComponent } from './payments-show-more/payments-show-more.component';
import { PaymentsTableComponent } from './payments-table/payments-table.component';
import { PaymentsComponent } from './payments.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsTableComponent,
    PaymentsPaginationComponent,
    PaymentsShowMoreComponent,
    PaymentsFilterComponent,
    PaymentAddComponent,
    PaymentDeleteComponent,
    PaymentAddFormComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, PaymentsRoutingModule, SharedModule]
})
export class PaymentsModule {}
