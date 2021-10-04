import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/app/_models/account/account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private prefixUrl: string = `${environment.apiUrl}/account`;

  constructor(private http: HttpClient) {}

  editAccount(account: Account) {
    const url = `${this.prefixUrl}/${account.id}`;
    const body = {
      name: account.name,
      email: account.email,
      password: account.password,
    };
    return this.http.patch<Account>(url, body);
  }
}
