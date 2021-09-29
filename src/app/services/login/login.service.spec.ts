import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '@features/login/login.component';
import { ApiService } from '@services/api/api.service';

import { LoginService } from './login.service';

let store: any = {};
const mockLocalStorage = {
  getItem: (key: string): string => {
    return key in store ? store[key] : null;
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  }
};

describe('LoginService', () => {
  let service: LoginService;
  let apiService: ApiService;
  let router: Router;
  const mock = { email: 'teste@email.com', password: '1234' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: '', component: LoginComponent }])],
      providers: [ApiService]
    });
    service = TestBed.inject(LoginService);
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticated user and save token on user service', () => {
    spyOn(apiService, 'get');

    const httpParams = new HttpParams().set('email', mock.email).set('password', mock.password);

    service.login(mock);

    expect(apiService.get).toHaveBeenCalledTimes(1);
    expect(apiService.get).toHaveBeenCalledWith('account', httpParams);
  });

  it('should logout and redirect to login', () => {
    spyOn(router, 'navigate');
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    // spy on event emitter
    const submittedSpy = spyOn(service.showMenuEmmiter, 'emit');

    service.logOut();

    expect(submittedSpy).toHaveBeenCalled();
    service.showMenuEmmiter.subscribe((response) => {
      expect(response).toBeTruthy();
    });
    expect(localStorage.clear()).toBeUndefined();
    expect(router.navigate).toHaveBeenCalledWith(['./']);
  });
});
