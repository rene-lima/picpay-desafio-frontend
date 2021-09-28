import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResult } from '@models/login/login-result.interface';
import { LoginForm } from '@models/login/login.interface';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apiService: ApiService) {}

  login({ email, password }: LoginForm): Observable<LoginResult[]> {
    const httpParams = new HttpParams().set('email', email).set('password', password);

    return this.apiService.get<LoginResult[]>('account', httpParams).pipe();
  }
}
