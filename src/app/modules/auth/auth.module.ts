import { LoginModule } from './pages/login/login.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, LoginModule]
})
export class AuthModule {}
