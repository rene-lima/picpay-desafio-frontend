import { SecureInnerPagesGuard } from './shared/guards/secure-inner-pages.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payments/payment/payment.component';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [LoginGuard] }
  // { path: 'payment', loadChildren: './payments/payments.module#PaymentsModule', canActivate: [LoginGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
