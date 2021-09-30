import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoModule } from '@shared/logo/logo.module';

import { NavDesktopComponent } from './nav-desktop/nav-desktop.component';
import { NavDropdownComponent } from './nav-dropdown/nav-dropdown.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, NavMobileComponent, NavDropdownComponent, NavDesktopComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, LogoModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
