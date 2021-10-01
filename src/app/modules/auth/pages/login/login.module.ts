import { LoginFormModule } from 'app/core/components/login-form/login-form.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login.component'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginFormModule]
})
export class LoginModule {}
