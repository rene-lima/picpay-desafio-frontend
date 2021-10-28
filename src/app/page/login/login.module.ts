import { NgModule } from '@angular/core';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  exports: [LoginFormComponent],
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class LoginModule { }
