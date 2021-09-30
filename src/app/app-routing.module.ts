import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./_pages/login/login.component";
import { PaymentsComponent } from "./_pages/payments/payments.component";
import { NotFoundComponent } from "./_pages/not-found/not-found.component";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "payments", component: PaymentsComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
