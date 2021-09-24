import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AccountService } from 'src/app/account/account.service'
import BrowserStorage from '../../../assets/utils/browser-storage'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  typeInputPassord = 'password'
  
  login = {
    email: '',
    password: '',
  }
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    const token = BrowserStorage.get('token')
    if(token){
      this.router.navigate([''])
    }
  }
  chageTypeInputPassord() {
    this.typeInputPassord = this.typeInputPassord === 'password' 
      ? 'input' 
      : 'password'
  }
  loginFlow() {
    this.accountService.login(this.login)
      .then(() => {
          this.router.navigate([''])
      })
      .catch(() => {
        BrowserStorage.clear()
        this.router.navigate([''])
      })
  }
}
