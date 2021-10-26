import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './modules/login/components/login.component';
import { FormsModule } from '@angular/forms';
import { AlertMessage } from './shared/messages/alert/alert.message';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    AlertMessage
  ],
  entryComponents: [
    AlertMessage
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
