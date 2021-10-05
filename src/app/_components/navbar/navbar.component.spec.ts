import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj<Router>(['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['']);
    
    await TestBed.configureTestingModule({
      providers: [
        NavbarComponent,
        { provide: Router, useClass: routerSpy },
        { provide: AuthService, useClass: authServiceSpy  }
      ]
    })
    .compileComponents();
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
