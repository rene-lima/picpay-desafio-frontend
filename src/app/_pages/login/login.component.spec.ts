import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth/auth.service";

import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let authServiceSpy: { get: jasmine.Spy };
  let routerSpy: { get: jasmine.Spy };

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
    authServiceSpy = jasmine.createSpyObj("AuthService", ["login"]);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder },
        { provide: AuthService, useClass: authServiceSpy },
        { provice: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
