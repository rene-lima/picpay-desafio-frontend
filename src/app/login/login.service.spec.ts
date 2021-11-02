import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API } from '../app.pi';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(LoginService);
    httpController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of User', () => {
    const mockResponse = {
      user: [{
        id: 0,
        name: "usuario",
        email: "usuario@gmail.com",
        password: "usuario"
      }]
    };

    service.login("usuario@gmail.com", "usuario").subscribe(response => {
      expect(response.length).toBe(1);
    });

    const req = httpController.expectOne(`${API}/account`);
    expect(req.request.method).toBe('GET');
    expect(service.login).toBeTruthy();
    req.flush(mockResponse);

  });

  afterEach(() => {
    httpController.verify();
  });
});
