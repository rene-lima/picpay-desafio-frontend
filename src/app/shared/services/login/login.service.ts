import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../models/login/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  
  public login(userLogin: User): Observable<User> {

    return this.httpClient.get('http://localhost:3000/account').pipe(map( (response: Response) => {
      let users = new Array<User>();
      users.push(response[0]);
      return this.mockToValidationUser(users, userLogin);
    }))
  }

  mockToValidationUser(users: Array<User>, userLogin: User): User {
    let user = new User();

    if (users.length > 0) {
      user = users.find(x => x.email == userLogin.email && x.password == userLogin.password);
    }

    return user;
  }
}
