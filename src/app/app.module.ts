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
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentViewComponent } from './pages/payment-view/payment-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';

@NgModule({
  declarations: [	
    AppComponent, LoginComponent, LoginPageIconComponent, FormComponent, PaymentViewComponent, NavbarComponent, PaymentListComponent, PaymentFormComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
