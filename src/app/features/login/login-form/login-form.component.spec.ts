import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/button/button.component';
import { ButtonModule } from '@shared/button/button.module';

import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginFormComponent } from './login-form.component';
import { LoginPasswordComponent } from './login-password/login-password.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent, LoginPasswordComponent, LoginEmailComponent, ButtonComponent],
      imports: [ReactiveFormsModule, ButtonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render form with email and password inputs', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#email')).toBeTruthy();
    expect(element.querySelector('#password')).toBeTruthy();
    expect(element.querySelector('button')).toBeTruthy();
  });

  it('should return model invalid when form is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email input as required', () => {
    const email = component.loginForm.controls.email;

    expect(email.valid).toBeFalsy();
    expect(email.errors?.required).toBeTruthy();
  });

  it('should validate email format', () => {
    const email = component.loginForm.controls.email;
    email.setValue('test');
    const errors = email.errors;

    expect(errors?.required).toBeFalsy();
    expect(errors?.email).toBeTruthy();
    expect(email.valid).toBeFalsy();
  });

  it('should validate email format correctly', () => {
    const email = component.loginForm.controls.email;
    email.setValue('test@test.com');
    const errors = email.errors || {};

    expect(email.valid).toBeTruthy();
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeFalsy();
  });

  it('should validate password input as required', () => {
    const password = component.loginForm.controls.password;

    expect(password.valid).toBeFalsy();
    expect(password.errors?.required).toBeTruthy();
  });

  it('should render email validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;

    expect(elements.querySelector('#email-required')).toBeFalsy();

    const button = elements.querySelector('button');
    button?.click();

    fixture.detectChanges();

    expect(elements.querySelector('#email-required')).toBeTruthy();
    expect(elements.querySelector('#email-required')?.textContent).toContain('E-mail é obrigatório.');
  });

  it('should render password validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#password-required')).toBeFalsy();

    elements.querySelector('button')?.click();

    fixture.detectChanges();

    expect(elements.querySelector('#password-required')).toBeTruthy();
    expect(elements.querySelector('#password-required')?.textContent).toContain('Senha é obrigatório.');
  });

  it('should emit login values when button is clicked and form is valid', () => {
    // filling form
    const email = component.loginForm.controls.email;
    email.setValue('test@test.com');
    const password = component.loginForm.controls.password;
    password.setValue('123456');

    // spy on event emitter
    const submittedSpy = spyOn(component.submitted, 'emit');

    // trigger the click
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(submittedSpy).toHaveBeenCalled();
    expect(submittedSpy).toHaveBeenCalledWith({ email: email.value, password: password.value });
  });
});
