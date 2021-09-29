import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environment/environment';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    apiService = TestBed.inject(ApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should httpClient get method', () => {
    apiService.get('endpoint').subscribe();
    const req = httpTesting.expectOne(`${environment.API_URL}endpoint`);
    expect(req.request.method).toEqual('GET');
  });

  it('should invoke httpClient post method', () => {
    const obj = { foo: 'foo', bar: 'bar' };

    apiService.post('endpoint', obj).subscribe();
    const req = httpTesting.expectOne(`${environment.API_URL}endpoint`);
    expect(req.request.body).toEqual(obj);
    expect(req.request.method).toEqual('POST');
  });

  it('should invoke httpClient put method', () => {
    const mock = { foo: 'foo', bar: 'bar' };

    apiService.put('endpoint/1', mock).subscribe();
    const req = httpTesting.expectOne(`${environment.API_URL}endpoint/1`);
    expect(req.request.body).toEqual(mock);
    expect(req.request.method).toEqual('PUT');
  });

  it('should invoke httpClient patch method', () => {
    const mock = { foo: 'foo' };

    apiService.patch('endpoint/1', mock).subscribe();
    const req = httpTesting.expectOne(`${environment.API_URL}endpoint/1`);
    expect(req.request.body).toEqual(mock);
    expect(req.request.method).toEqual('PATCH');
  });

  it('should invoke httpClient delete method', () => {
    apiService.delete('endpoint/1').subscribe();
    const req = httpTesting.expectOne(`${environment.API_URL}endpoint/1`);
    expect(req.request.method).toEqual('DELETE');
  });
});
