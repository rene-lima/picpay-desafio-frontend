import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './page/login/login.component';
import {LoginModule} from './page/login/login.module';
import {MyPaymentComponent} from './page/my-payment/my-payment.component';

const routes: Routes = [
    {
    path: '',
    component: LoginComponent
  },
    {
        path: 'pagamentos',
        component: MyPaymentComponent,
    }
];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(routes),
      LoginModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
