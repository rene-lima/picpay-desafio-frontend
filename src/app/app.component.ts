import { Component, OnInit } from '@angular/core';
import { LoginService } from '@services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLogged = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    // observe auth to show or not header/navbar
    this.loginService.showMenuEmmiter.subscribe((show) => {
      this.isLogged = show;
    });
  }
}
