import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { LoginEmailComponent } from './login-form/login-email/login-email.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPasswordComponent } from './login-form/login-password/login-password.component';
import { LoginIllustrationComponent } from './login-illustration/login-illustration.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginWelcomeComponent } from './login-welcome/login-welcome.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginEmailComponent,
    LoginPasswordComponent,
    LoginIllustrationComponent,
    LoginWelcomeComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, LoginRoutingModule, SharedModule, RouterModule]
})
export class LoginModule {}
