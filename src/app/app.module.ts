import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PayfriendsInputComponent } from './components/payfriends-input/payfriends-input.component';
import { PayfriendsCheckboxComponent } from './components/payfriends-checkbox/payfriends-checkbox.component';
import { PayfriendsButtonComponent } from './components/payfriends-button/payfriends-button.component';
import { PayfriendsModalComponent } from './components/payfriends-modal/payfriends-modal.component';
import { PayfriendsMainComponent } from './components/payfriends-main/payfriends-main.component';
import { BaseComponent } from './pages/base/base.component';
import { MyPaymentsComponent } from './pages/my-payments/my-payments.component';
import { PayfriendsTableComponent } from './components/payfriends-table/payfriends-table.component';
import { PayfriendsPaginatorComponent } from './components/payfriends-paginator/payfriends-paginator.component';
import { NgxMaskModule } from 'ngx-mask'
import { NgxCurrencyModule } from 'ngx-currency'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ChangeTaskModalComponent } from './pages/my-payments/change-task-modal/change-task-modal.component';
import { DeleteTaskModalComponent } from './pages/my-payments/delete-task-modal/delete-task-modal.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    PayfriendsInputComponent,
    PayfriendsCheckboxComponent,
    PayfriendsButtonComponent,
    PayfriendsModalComponent,
    PayfriendsMainComponent,
    BaseComponent,
    MyPaymentsComponent,
    PayfriendsTableComponent,
    PayfriendsPaginatorComponent,
    ChangeTaskModalComponent,
    DeleteTaskModalComponent,
   ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({ dropSpecialCharacters: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
