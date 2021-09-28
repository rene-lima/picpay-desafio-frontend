import { Injectable } from '@angular/core';
import { User } from '@models/login/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  get currentUser(): User {
    const user: User = JSON.parse(localStorage.getItem('user_data') || '');
    return user;
  }
}
