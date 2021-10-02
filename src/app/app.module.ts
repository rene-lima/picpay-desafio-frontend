import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageIconComponent } from './icons/login-page-icon/login-page-icon.component';
import { FormComponent } from './components/form/form.component';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentViewComponent } from './pages/payment-view/payment-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [	
    AppComponent, LoginComponent, LoginPageIconComponent, FormComponent, PaymentViewComponent, NavbarComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
