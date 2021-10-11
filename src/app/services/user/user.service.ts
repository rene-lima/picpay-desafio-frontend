import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/account?email=${email}`);
  }
}
