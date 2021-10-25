import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    service = new AuthGuard(authServiceSpy, routerSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when call userIsAuthenticated', () => {
    authServiceSpy.userIsAuthenticated.and.returnValue(true)

    service.canActivate(null, null);

    expect(authServiceSpy.userIsAuthenticated()).toBeTrue()
  });

  it('should return false when call userIsAuthenticated', () => {
    authServiceSpy.userIsAuthenticated.and.returnValue(false)

    service.canActivate(null, null);

    expect(authServiceSpy.userIsAuthenticated()).toBeFalse()
  });
});
