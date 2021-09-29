import { Injectable } from '@angular/core';
import { User } from '@models/login/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  get currentUser(): User | null {
    const userData = localStorage.getItem('user_data') || '';

    if (userData) {
      const user: User = JSON.parse(userData);
      return user;
    }

    return null;
  }
}
