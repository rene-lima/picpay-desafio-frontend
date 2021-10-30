import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginDTO} from '../../../../core/DTO/loginDTO';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  hide = true;

  form: FormGroup;

  @Output() formLoginEmit = new EventEmitter<LoginDTO>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  emitLogin() {
    const login = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };
    this.formLoginEmit.emit(login);
  }

}
