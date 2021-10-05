import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: AuthService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({ providers: [
      AuthService,
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
