import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { get: jasmine.Spy };
  let router: jasmine.SpyObj<Router>

  const user = {
    id: 0,
    name: 'usuario',
    email: 'usuario@gmail.com',
    password: 'usuario',
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    router = jasmine.createSpyObj<Router>(['navigate'])


    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: router },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call authUser()', () => {
    let authUserSpy = spyOn(service, "authUser")
    authUserSpy(user, user);
    expect(authUserSpy).toHaveBeenCalled();
  });

  it('should call router navigate', () => {
    service.authUser(user, user)
    expect(router.navigate).toHaveBeenCalled()
  })

  it('should call userIsAuthenticated()', () => {
    let userIsAuthenticatedSpy = spyOn(service, "userIsAuthenticated");
    userIsAuthenticatedSpy();
    expect(userIsAuthenticatedSpy).toHaveBeenCalled();
  });
});
