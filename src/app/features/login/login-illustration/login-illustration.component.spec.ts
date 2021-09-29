import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIllustrationComponent } from './login-illustration.component';

describe('LoginIllustrationComponent', () => {
  let component: LoginIllustrationComponent;
  let fixture: ComponentFixture<LoginIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginIllustrationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render an illustration as img', () => {
    const fixture = TestBed.createComponent(LoginIllustrationComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('img')).toBeTruthy();
  });
});
