import { Injectable } from '@angular/core';
import api from '../../../api'
import BrowserStorage from '../../assets/utils/browser-storage'


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userTruthy= { email:'user@mail.com', password: 'password' }

  login(user: any) {
    if(user.email === this.userTruthy.email){
      return this.loginTest(user)
    }
    if(BrowserStorage.get('token')) return Promise.resolve()
    return api.post('/auth/login', user)
      .then(({ data }) => {
        const token = data?.access_token
          BrowserStorage.set('token', token)
      })
  }
  loginTest({email, password}:any) {
    const login = new Promise((resolve, reject) => {
      const isValidUser = email === this.userTruthy.email && password === this.userTruthy.password

      return isValidUser ? resolve('200') : reject('401')
    })
    return login
  }
}
