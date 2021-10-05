import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AccountService } from "src/app/_services/account/account.service";
import { AuthService } from "src/app/_services/auth/auth.service";

import { ProfileComponent } from "./profile.component";

describe("ProfileComponent", () => {
  let authServiceSpy: { get: jasmine.Spy };
  let accountServiceSpy: { get: jasmine.Spy };

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj("AuthService", ["userAccount"]);
    accountServiceSpy = jasmine.createSpyObj("AccountService", ["editAccount"]);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],

      providers: [
        { provide: AuthService, useClass: authServiceSpy },
        { provide: AccountService, useClass: accountServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
