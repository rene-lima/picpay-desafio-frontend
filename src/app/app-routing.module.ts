import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { PaymentViewComponent } from "./pages/payment-view/payment-view.component";

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'payment-view', component: PaymentViewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }