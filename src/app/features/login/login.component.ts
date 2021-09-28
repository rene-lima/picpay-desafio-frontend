import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '@models/login/login.interface';
import { LoginService } from '@services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  doLogin(loginData: LoginForm) {
    this.loginService.login(loginData).subscribe((response) => {
      const { name } = response[0] || '';

      if (name) {
        // fake token
        localStorage.setItem('user_token', JSON.stringify({ name, token: 'token' }));
        localStorage.setItem('user_data', JSON.stringify(response[0]));

        this.router.navigate(['/payments']);
      } else {
        console.error('Usuário não encontrado na base de dados.');
      }
    });
  }
}
