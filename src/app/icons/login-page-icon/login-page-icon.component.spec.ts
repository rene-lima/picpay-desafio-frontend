import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageIconComponent } from './login-page-icon.component';

describe('LoginPageIconComponent', () => {
  let component: LoginPageIconComponent;
  let fixture: ComponentFixture<LoginPageIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
