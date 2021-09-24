import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import { BaseComponent } from './pages/base/base.component'
import { MyPaymentsComponent } from './pages/my-payments/my-payments.component'
import { AuthGuard } from './account/auth.guard';

const routes: Routes = [
  {
    path:'', 
    component: BaseComponent,
    children: [
      { path:'', component: MyPaymentsComponent },
    ],
    canActivate: [AuthGuard]
  },
  { 
    path:'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
