import { Injectable } from '@angular/core';
import { User } from '../../models/login/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public authService: AuthService) { }

  createProfile(user: User) {
    let usuarioEncriptado = JSON.stringify(user);
    usuarioEncriptado = this.authService.encrypt(usuarioEncriptado);
    window.sessionStorage.setItem('profile', usuarioEncriptado);
  };

  getCachedProfile() {
    const item = window.sessionStorage.getItem('profile');
    let usuario: User;

    if (item !== null) {
      usuario = <User>JSON.parse(this.authService.decrypt(item));
    }

    return usuario;
  }

}
