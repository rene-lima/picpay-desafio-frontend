import { Component, OnInit } from '@angular/core';
import { User } from '@models/login/user.interface';
import { LoginService } from '@services/login/login.service';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private loginService: LoginService, private userService: UserService) {}

  logOut() {
    this.loginService.logOut();
  }

  ngOnInit() {
    const user = this.userService.currentUser;

    if (user) this.user = user;
  }
}
