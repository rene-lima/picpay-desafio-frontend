import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@core/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule) },
  {
    path: 'payments',
    loadChildren: () => import('./features/payments/payments.module').then((m) => m.PaymentsModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
