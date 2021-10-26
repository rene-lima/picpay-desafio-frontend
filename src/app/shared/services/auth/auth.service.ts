import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public guid: string = '9ECDB95B12B74570B13A75C468C6CFD5';
  private jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  public encrypt(item) {
    try {
      if (item === undefined || item === null || item === '') {
        return null;
      }

      const key = CryptoJS.enc.Utf8.parse(this.guid);
      const iv = CryptoJS.lib.WordArray.random(16);
      const encrypted = CryptoJS.AES.encrypt(item, key, {
        iv: iv
      });
      return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);

    } catch {
      return null;
    }
  }

  public decrypt(item) {
    try {

      if (item === undefined || item === null || item === '') {
        return null;
      }

      const key = CryptoJS.enc.Utf8.parse(this.guid);
      const ciphertext = CryptoJS.enc.Base64.parse(item);

      const iv = ciphertext.clone();
      iv.sigBytes = 16;
      iv.clamp();
      ciphertext.words.splice(0, 4);
      ciphertext.sigBytes -= 16;
      const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
        iv: iv
      });
      return decrypted.toString(CryptoJS.enc.Utf8);

    } catch {
      return null;
    }
  }

  public isAuthenticated(): boolean {
    let token: any = window.sessionStorage.getItem('token');
    return (token != null) ? !this.jwtHelper.isTokenExpired(JSON.stringify(token)) : false;
  }

  private tokenIsValid(): boolean {
    let token: any = window.sessionStorage.getItem('token');

    if(token !== undefined && token != null && this.jwtHelper.isTokenExpired(JSON.stringify(token), 600)) {
      token = this.updateToken(token);
      window.sessionStorage.setItem('token', token);
      return (!this.jwtHelper.isTokenExpired(JSON.stringify(token), 15));
    }

    if (token !== undefined && token != null) {
        return (!this.jwtHelper.isTokenExpired(JSON.stringify(token), 15));
    }
    return false;
}

  public getAccessToken(): string {
    if (this.tokenIsValid()) {
      return this.getAccessTokenCache();
    }
    return '';
  }

  private getAccessTokenCache(): string {
    const token: any = window.sessionStorage.getItem('token');
    if (token != null && token != '') {
      if (!this.jwtHelper.isTokenExpired(JSON.stringify(token), 60)) {
        return token;
      }
    }
    return null;
  }

  private updateToken( token )  {
    //expired in: 26 Outubro 2022 02:09:10 

    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVEYXRlIjoiMjAyMi0xMC0yNlQwMTozNToyNi42Nzg0NzErMDA6MDAiLCJleHAiOjE2NjY3NTAxNTAsImlkIjoiMCIsIm5hbWUiOiJ1c3VhcmlvIiwiZW1haWwiOiJ1c3VhcmlvQGdtYWlsLmNvbSJ9.vjncUwlApccwOcDRcsfjw5aMo9HDZcEG9BGfLj39T1U';
  }
}
