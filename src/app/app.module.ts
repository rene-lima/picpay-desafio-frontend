import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './modules/login/components/login.component';
import { FormsModule } from '@angular/forms';
import { AlertMessage } from './shared/messages/alert/alert.message';
import { CommonModule } from '@angular/common';

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
    CommonModule, 
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
