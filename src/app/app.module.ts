import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './page/login/login.module';
import {CommonModule} from '@angular/common';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent, LoginComponent,
   ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LoginModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
