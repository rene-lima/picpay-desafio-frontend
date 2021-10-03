import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private accessTokenSubject: BehaviorSubject<string>;

  public accessToken: Observable<string>;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("accessToken")) {
      this.loadTokensFromLocalStorage();
    } else {
      this.loadTokensFromSessionStorage();
    }
    this.accessToken = this.accessTokenSubject.asObservable();
  }

  private loadTokensFromLocalStorage() {
    this.accessTokenSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem("accessToken"))
    );
  }

  private loadTokensFromSessionStorage() {
    this.accessTokenSubject = new BehaviorSubject<string>(
      JSON.parse(sessionStorage.getItem("accessToken"))
    );
  }

  public get accessTokenValue(): string {
    return this.accessTokenSubject.value;
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
    this.accessTokenSubject.next(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("account");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("account");
  }
}
