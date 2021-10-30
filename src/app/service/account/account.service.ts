import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AccountDTO} from '../../core/DTO/accountDTO';
import {LoginDTO} from "../../core/DTO/loginDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  route = 'account';

  constructor(
      private http: HttpClient
  ) { }

  getAccount(login: LoginDTO): Observable<AccountDTO[]> {

    const params = new HttpParams({fromObject: JSON.parse(JSON.stringify(login))});
    return this.http.get<AccountDTO[]>(this.route, {params});
  }
}
