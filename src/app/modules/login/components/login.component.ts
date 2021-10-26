import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertMessage } from 'src/app/shared/messages/alert/alert.message';
import { User } from 'src/app/shared/models/login/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User;
  public loadingLogin: boolean = false;

  @Output() userData = new EventEmitter();

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService
  ) {
    this.user = new User();
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  public login() {

    if (!this.verifyEmail() || this.user.email == undefined || this.user.email == '') {
      this.dialog.open(AlertMessage, {
        width: '250px', data: { title: 'Atenção!', content: 'Digite um e-mail válido' }
      });
      return;
    }

    if (this.user.password == undefined || this.user.password == '') {
      this.dialog.open(AlertMessage, {
        width: '250px', data: { title: 'Atenção!', content: 'Por favor, preencha o campo de senha!' }
      });
      return;
    }

    this.loadingLogin = true;

    this.loginService.login(this.user).subscribe((userResponse: User) => {
      if (Object.keys(userResponse).length > 0) {
        userResponse.success = true;

        this.salvarToken(userResponse.token);
        this.userData.emit(userResponse);
      } else {
        this.dialog.open(AlertMessage, {
          width: '250px', data: { title: 'Atenção!', content: 'Usuário ou senha inválido!' }
        });
      }

      this.loadingLogin = false;
    }, err => {
      if (err.status == 400) {
        this.dialog.open(AlertMessage, {
          width: '250px', data: { title: 'Ops, algo deu errado!', content: err.cerror[0] }
        });
      } else {
        console.log('Error -> ', err);
      }

      this.loadingLogin = false;
    });
  }

  salvarToken(token) {
    window.sessionStorage.setItem('token', token);
  }

  public verifyEmail(): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.user.email);
  }
}
