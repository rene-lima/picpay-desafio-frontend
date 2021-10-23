import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/login/user.model';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(private loginService: LoginService) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  public login() {

    console.log(this.user);

    this.loginService.login(this.user).subscribe((userResponse: User) => {
      if (Object.keys(userResponse).length === 0) {
        console.log('Usuário ou senha incorreto!');
        return;
      }
    });
  }
}
