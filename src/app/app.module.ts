import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { LoginComponent } from './modules/login/login.component';
@NgModule({
  declarations: [	
    AppComponent, LoginComponent, PaymentComponent,
   ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
