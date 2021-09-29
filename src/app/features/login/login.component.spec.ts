import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '@services/login/login.service';
import { ButtonComponent } from '@shared/button/button.component';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';

import { LoginFormComponent } from './login-form/login-form.component';
import { LoginIllustrationComponent } from './login-illustration/login-illustration.component';
import { LoginWelcomeComponent } from './login-welcome/login-welcome.component';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;

  const loginServiceStub: jasmine.SpyObj<LoginService> = jasmine.createSpyObj('loginService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LoginWelcomeComponent,
        LoginIllustrationComponent,
        LoginFormComponent,
        ButtonComponent
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, ReactiveFormsModule],
      providers: [
        {
          provide: LoginService,
          useValue: loginServiceStub
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should call doLogin when the submitted event emits', () => {
    const formMock = { email: 'email@gmail.com', password: '12345' };
    spyOn(component, 'doLogin');

    const formComponent = de.query(By.directive(LoginFormComponent));
    const cmp = formComponent.componentInstance;
    cmp.submitted.emit(formMock);

    expect(component.doLogin).toHaveBeenCalledWith(formMock);
  });

  it('should invoke login service when submitted value is valid', () => {
    const formMock = { email: 'email@gmail.com', password: '12345' };

    // mocking service return to always be an empty observable: of()
    loginServiceStub.login.and.returnValue(of());

    const formComponent = de.query(By.directive(LoginFormComponent));
    const cmp = formComponent.componentInstance;
    cmp.submitted.emit(formMock);

    expect(loginServiceStub.login.calls.any()).toBeTruthy();
    expect(loginServiceStub.login).toHaveBeenCalledWith(formMock);
  });
});
