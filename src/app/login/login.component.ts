import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {

  }

  async onSubmit() {
    await this._loginService.login(this.form.get('email').value, this.form.get('password').value).subscribe(
      response => {
        if (response.length > 0) {
          this._loginService.StoreUser(response[0]);
          this._router.navigate(['payment']);
        }
        else {
          this.form.get('password').setErrors({ valid: false })
        }
      },
      error => {
        this.form.get('password').setErrors({ valid: false })
      }
    )
  }

}
