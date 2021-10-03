import { MyPaymentsComponent } from 'app/modules/payments/pages/my-payments/my-payments.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PaymentsComponent } from './payments.component'

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    children: [
      {
        path: 'my-payments',
        component: MyPaymentsComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {}
