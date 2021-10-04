import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { PoButtonModule, PoFieldModule } from '@po-ui/ng-components'
import { LoginFormComponent } from './login-form.component'
import { AuthService } from 'app/core/services/auth/auth.service'

@NgModule({
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  imports: [CommonModule, ReactiveFormsModule, PoFieldModule, PoButtonModule, RouterModule],
  providers: [AuthService]
})
export class LoginFormModule {}
