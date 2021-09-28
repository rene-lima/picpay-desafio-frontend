import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '@models/login/login.interface';

@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="loginForm">
      <app-login-email [parent]="loginForm" [touchedButton]="touched"></app-login-email>

      <div class="mt-6">
        <app-login-password [parent]="loginForm" [touchedButton]="touched"></app-login-password>
      </div>

      <div class="mt-6">
        <span class="block w-full rounded-md shadow-sm">
          <app-button buttonType="submit" buttonLabel="Entrar" (clicked)="onSubmit(loginForm)"></app-button>
        </span>
      </div>
    </form>
  `
})
export class LoginFormComponent implements OnInit {
  @Output() submitted = new EventEmitter();

  loginForm: FormGroup;
  touched = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  onSubmit({ value, valid }: { value: LoginForm; valid: boolean }) {
    this.touched = true;
    if (valid) {
      this.submitted.emit(value);
      this.buildForm();
      this.touched = false;
    }
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
