import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { PaymentComponent } from './payments/payment/payment.component';
import { AddPaymentComponent } from './payments/add-payment/add-payment.component';
import { DeletePaymentComponent } from './payments/delete-payment/delete-payment.component';
import { FilterPaymentComponent } from './payments/filter-payment/filter-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    PaymentComponent,
    AddPaymentComponent,
    DeletePaymentComponent,
    FilterPaymentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
