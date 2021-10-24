import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProps } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  private readonly API = `${environment.API}account`;

  getAccount(user: UserProps) {
    const params = {
      email: user.email,
      password: user.password,
    };

    return this.http.get<UserProps[]>(this.API, { params });
  }
}
