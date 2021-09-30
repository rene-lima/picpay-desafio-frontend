import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./_pages/login/login.component";
import { PaymentsComponent } from "./_pages/payments/payments.component";
import { DeletePaymentComponent } from "./_components/delete-payment/delete-payment.component";
import { AddPaymentComponent } from "./_components/add-payment/add-payment.component";
import { PaymentFormComponent } from "./_components/payment-form/payment-form.component";
import { NotFoundComponent } from "./_pages/not-found/not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaymentsComponent,
    DeletePaymentComponent,
    AddPaymentComponent,
    PaymentFormComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
