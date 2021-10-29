import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../core/DTO/loginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginHandler(login: LoginDTO) {
  }
}
