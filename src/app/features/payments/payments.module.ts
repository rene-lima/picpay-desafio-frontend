import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@shared/button/button.module';
import { LogoModule } from '@shared/logo/logo.module';

import { PaymentsPaginationComponent } from './payments-pagination/payments-pagination.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsTableComponent } from './payments-table/payments-table.component';
import { PaymentsComponent } from './payments.component';
import { PaymentsShowMoreComponent } from './payments-show-more/payments-show-more.component';
import { PaymentsFilterComponent } from './payments-filter/payments-filter.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsTableComponent,
    PaymentsPaginationComponent,
    PaymentsShowMoreComponent,
    PaymentsFilterComponent
  ],
  imports: [CommonModule, PaymentsRoutingModule, LogoModule, ButtonModule]
})
export class PaymentsModule {}
