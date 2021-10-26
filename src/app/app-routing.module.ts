import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./modules/login/components/login.component";
import { AuthGuard } from "./shared/infra/auth.guard";
import { LoadGuard } from "./shared/infra/load.guard";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'payments',
        loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule),
        canLoad: [LoadGuard],
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'payments', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule { }