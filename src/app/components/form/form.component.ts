import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public router: Router) { }

  hide = true;

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  ngOnInit(): void {
  }

  login() {
    const userLoginData = {...this.loginForm.value}

    this.authService.login(userLoginData).subscribe(() => {
      if (this.authService.isLoggedIn) {
        const redirectUrl = '/payment-view';

        this.router.navigate([redirectUrl]);
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}
