import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/models/login/user.model';
import { AuthService } from './shared/services/auth/auth.service';
import { ProfileService } from './shared/services/profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAuth: boolean = false;
  public userDataFull: User;

  constructor(
    private router: Router, 
    public profileService: ProfileService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
    if (!this.isAuth && window.sessionStorage.getItem('token') !== null) {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('profile');
    }
  }

  loadingUserData(user: User) {
    this.isAuth = user.success;
    if (this.isAuth) {
      this.profileService.createProfile(user);
      this.router.navigate(['/payments']);
    } else {
      this.logout();
    }
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('profile');
    this.isAuth = false;

    this.router.navigate(['/login']);
  }
}
