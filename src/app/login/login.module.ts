import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputModule } from '@features/input/input.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, InputModule]
})
export class LoginModule {}
