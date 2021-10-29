import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginDTO} from '../../../../../core/DTO/loginDTO';



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
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    });
  }

  emitLogin() {
    const login = {
      Email: this.form.get('Email').value,
      Password: this.form.get('Password').value
    };
    this.formLoginEmit.emit(login);
  }

}
