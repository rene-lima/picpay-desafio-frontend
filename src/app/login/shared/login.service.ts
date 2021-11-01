import { User } from './../../shared/model/user.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/app.pi';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly USER = 'user';

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  login(email: string, password: string) {
    return this._http.get<User[]>(`${API}/account`).pipe(
      map((response: User[]) => {
        return response.filter(user => {
          return user.email === email && user.password === password;
        })
      })
    )
  }

  doLoginUser(user: User) {
    this.StoreUser(user)
  }

  doLogoutUser() {
    this.clearStorage();
    this._router.navigate(['']);
  }

  isLoggedIn() {
    return !!this.getUser();
  }

  StoreUser(user: User) {
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  getUser() {
    return localStorage.getItem(this.USER);
  }

  clearStorage() {
    localStorage.clear();
  }
}
