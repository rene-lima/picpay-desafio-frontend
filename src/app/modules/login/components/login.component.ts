import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/models/login/user.model';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User;
  public loadingLogin: boolean = false;

  constructor(
    private loginService: LoginService, 
    public snackBar: MatSnackBar
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  public login() {    

    if (!this.verifyEmail()) {
      return;
    }

    if (this.user.password == undefined || this.user.password == '') {
      console.log("Por favor, preencher os campos usuário e senha!");
      return;
    }

    this.loadingLogin = true;

    this.loginService.login(this.user).subscribe((userResponse: User) => {
      if (Object.keys(userResponse).length === 0) {
        console.log('Usuário ou senha incorreto!');
        return;
      }
      this.loadingLogin = false;
    });
  }

  public verifyEmail(): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.user.email);
  }
}
