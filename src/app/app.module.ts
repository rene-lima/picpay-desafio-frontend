import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './page/login/login.module';
import {CommonModule} from '@angular/common';
import { MaterialModule } from './shared/material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UrlInterceptor} from "./core/interceptor/url.interceptor";
import { MyPaymentComponent } from './page/my-payment/my-payment.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, MyPaymentComponent,
   ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LoginModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
