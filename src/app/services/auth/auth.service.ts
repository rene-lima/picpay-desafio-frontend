import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserProps } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  authUser(user: UserProps, apiUser: UserProps) {
    if (user.email === apiUser.email && user.password === apiUser.password) {
      this.isAuthenticated = true;
      this.router.navigate(['/pagamentos']);
    } else {
      this.isAuthenticated = false;
    }
  }

  userIsAuthenticated() {
    return this.isAuthenticated;
  }
}
