import { TestBed } from '@angular/core/testing';

import { IsDateService } from './is-date.service';

describe('IsDateService', () => {
  let service: IsDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
