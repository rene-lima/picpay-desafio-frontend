import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserLogin } from 'app/core/entities/user/user.interface'
import { AuthService } from 'app/core/services/auth/auth.service'
import { QueryFilter } from './../../../shared/utils/http/query-filter.interface'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  })

  constructor(private readonly authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userIsAuthenticated.subscribe(authenticated => {
      if (!authenticated) return

      this.router.navigateByUrl('/payments/my-payments')
    })
  }

  doLogin(): void {
    if (this.form.invalid) return

    const user: UserLogin = { ...this.form.value }

    const filters: QueryFilter[] = [
      { field: 'email', value: user.email },
      { field: 'password', value: user.password }
    ]

    this.authService.authenticateUser(filters)
  }
}
