import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProps } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private user: UserProps;

  form: FormGroup;

  sub: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

  onLogin(): void {
    if (this.form.valid) {
      this.user = this.form.value;
      this.sub.push(
        this.accountService
          .getAccount(this.user)
          .pipe(
            map(response => response[0]),
          )
          .subscribe((apiUser) => {
            if (apiUser) {
              this.authService.authUser(this.user, apiUser);
            }
          })
      );
    }
  }
}
