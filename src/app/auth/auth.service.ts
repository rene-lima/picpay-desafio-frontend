import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private userService: UserService) {

  }

  isLoggedIn = false;
  redirectUrl: String;
  user: User;

  login(userLoginData: any): Observable<boolean> {
    let validate: boolean = false;

    this.userService.getUserByEmail(userLoginData.email).subscribe(
      data => {
        this.user = {...data[0]}
      }, err => {
        console.log("Usuário não encontrado")
      }
    )

    if (this.user) {
      validate = this.validateAccess(userLoginData);
    } 


    return of(validate).pipe(
      delay(1000), tap(() => this.isLoggedIn = validate)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  validateAccess(userLoginData: any): boolean {
    const validateEmail = this.user.email === userLoginData.email;
    const validatePassword = this.user.password === userLoginData.password;

    return validatePassword && validateEmail;
  }
}
