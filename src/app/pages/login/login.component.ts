import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AccountService } from 'src/app/account/account.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import BrowserStorage from '../../../assets/utils/browser-storage'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  typeInputPassord = 'password'
  erroMessage = 'Lucas'
  login: FormGroup

  constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const token = BrowserStorage.get('token')
    if (token) {
      this.router.navigate([''])
    }
    this.createFormTask()
  }
  chageTypeInputPassord() {
    this.typeInputPassord = this.typeInputPassord === 'password'
      ? 'input'
      : 'password'
  }
  loginFlow() {
    if (this.login.valid) {
      return this.accountService.login(this.login.value)
        .catch(() => {
          BrowserStorage.clear()
        })
        .finally(() => {
          this.router.navigate([''])
        })
    }
  }
  createFormTask() {
    this.login = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })
  }
}
