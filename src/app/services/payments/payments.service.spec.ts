import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@services/api/api.service';

import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let paymentsService: PaymentsService;
  let httpTesting: HttpClientTestingModule;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    paymentsService = TestBed.inject(PaymentsService);
    httpTesting = TestBed.inject(HttpClientTestingModule);
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(paymentsService).toBeTruthy();
  });

  it('should invoke patch method when changing payment status', () => {
    spyOn(apiService, 'patch');

    paymentsService.editPaymentStatus(1, false);

    expect(apiService.patch).toHaveBeenCalledTimes(1);
    expect(apiService.patch).toHaveBeenCalledWith('tasks/1', {
      isPayed: false
    });
  });

  it('should invoke post method when creating/add payment', () => {
    const payment = { username: 'teste', value: 10, date: new Date(), title: 'titulo' };

    spyOn(apiService, 'post');

    paymentsService.create(payment);

    expect(apiService.post).toHaveBeenCalledTimes(1);
    expect(apiService.post).toHaveBeenCalledWith('tasks', payment);
  });

  it('should invoke delete method when removing payment', () => {
    spyOn(apiService, 'delete');

    paymentsService.delete(1);

    expect(apiService.delete).toHaveBeenCalledTimes(1);
    expect(apiService.delete).toHaveBeenCalledWith('tasks/1');
  });
});
