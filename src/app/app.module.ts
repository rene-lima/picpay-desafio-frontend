import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import ptBr from "@angular/common/locales/pt";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalModule } from "ngx-bootstrap/modal";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./_pages/login/login.component";
import { PaymentsComponent } from "./_pages/payments/payments.component";
import { NotFoundComponent } from "./_pages/not-found/not-found.component";

import { DeletePaymentComponent } from "./_components/delete-payment/delete-payment.component";
import { AddPaymentComponent } from "./_components/add-payment/add-payment.component";
import { PaymentFormComponent } from "./_components/payment-form/payment-form.component";
import { NavbarComponent } from "./_components/navbar/navbar.component";
import { PaginationTemplateComponent } from "./_components/pagination-template/pagination-template.component";
import { EditPaymentComponent } from './_components/edit-payment/edit-payment.component';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaymentsComponent,
    DeletePaymentComponent,
    AddPaymentComponent,
    PaymentFormComponent,
    NotFoundComponent,
    NavbarComponent,
    PaginationTemplateComponent,
    EditPaymentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
