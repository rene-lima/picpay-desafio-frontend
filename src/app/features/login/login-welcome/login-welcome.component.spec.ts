import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWelcomeComponent } from './login-welcome.component';

describe('LoginWelcomeComponent', () => {
  let component: LoginWelcomeComponent;
  let fixture: ComponentFixture<LoginWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginWelcomeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render welcome back title', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('h2').textContent).toContain('Bem vindo de volta');
  });
});
