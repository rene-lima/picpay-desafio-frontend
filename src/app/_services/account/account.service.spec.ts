import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: AccountService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({ providers: [
      AccountService,
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
