import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Account } from "src/app/_models/account/account";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private accessTokenSubject: BehaviorSubject<string>;
  public accessToken: Observable<string>;

  private userAccountSubject: BehaviorSubject<Account>;
  public userAccount: Observable<Account>;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("accessToken")) {
      this.loadTokensFromLocalStorage();
      this.loadUserAccountFromLocalStorage();
    } else {
      this.loadTokensFromSessionStorage();
      this.loadUserAccountFromSessionStorage();
    }
    this.accessToken = this.accessTokenSubject.asObservable();
    this.userAccount = this.userAccountSubject.asObservable();
  }

  private loadTokensFromLocalStorage() {
    this.accessTokenSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem("accessToken"))
    );
  }

  private loadUserAccountFromLocalStorage() {
    this.userAccountSubject = new BehaviorSubject<Account>(
      JSON.parse(localStorage.getItem("account"))
    );
  }

  private loadTokensFromSessionStorage() {
    this.accessTokenSubject = new BehaviorSubject<string>(
      JSON.parse(sessionStorage.getItem("accessToken"))
    );
  }

  private loadUserAccountFromSessionStorage() {
    this.userAccountSubject = new BehaviorSubject<Account>(
      JSON.parse(sessionStorage.getItem("account"))
    );
  }

  public get accessTokenValue(): string {
    return this.accessTokenSubject.value;
  }

  public get userAccountValue(): Account {
    return this.userAccountSubject.value;
  }

  public setUserAccountValue(account: Account): void {
    this.userAccountSubject.next(account);
    localStorage.setItem("account", JSON.stringify(account));
    sessionStorage.setItem("account", JSON.stringify(account));
  }

  login(email: string, password: string, keepConnected?: boolean) {
    const url = `${environment.apiUrl}/account`;
    const params: HttpParams = new HttpParams()
      .set("email", email)
      .set("password", password);

    return this.http.get(url, { params: params }).pipe(
      map((res: any) => {
        if (res && res.length === 1) { // Obs.: Adaptação para funcionamento com Json-Server.
          this.accessTokenSubject.next(res[0].accessToken);
          this.userAccountSubject.next(res[0]);
          if (keepConnected) {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(res[0].accessToken)
            );
            localStorage.setItem("account", JSON.stringify(res[0]));
          } else {
            sessionStorage.setItem(
              "accessToken",
              JSON.stringify(res[0].accessToken)
            );
            sessionStorage.setItem("account", JSON.stringify(res[0]));
          }
        }
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("account");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("account");
    this.accessTokenSubject.next(null);
    this.userAccountSubject.next(null);
  }
}
