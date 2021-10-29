import { NgModule } from '@angular/core';
import { LoginFormComponent } from './component/login-form/login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../shared/material.module';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  exports: [LoginFormComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class LoginModule { }
