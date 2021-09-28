import { HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/login/user.interface';
import { LoginForm } from '@models/login/login.interface';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public showMenuEmmiter = new EventEmitter<boolean>();

  constructor(private apiService: ApiService, private router: Router) {}

  login({ email, password }: LoginForm): Observable<User[]> {
    const httpParams = new HttpParams().set('email', email).set('password', password);

    return this.apiService.get<User[]>('account', httpParams).pipe();
  }

  isAuthenticated() {
    if (localStorage.getItem('user_token')) {
      this.setUserLogged(true);
      return true;
    } else {
      this.setUserLogged(false);
      return false;
    }
  }

  setUserLogged(logged: boolean) {
    this.showMenuEmmiter.emit(logged);
  }

  logOut() {
    this.setUserLogged(false);
    localStorage.clear();
    this.router.navigate(['./']);
  }
}
