import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PaginatePipe, PaginationService } from 'ngx-pagination';
import { Payment } from 'src/app/_models/payment/payment';
import { PaymentService } from 'src/app/_services/payment/payment.service';
import { asyncData } from 'src/app/_testing/async-observable-helpers';

import { PaymentsComponent } from './payments.component';

class MockPaymentService {
  getPayments() {
    const expectedPayments: Payment[] = [
      {
        id: 1,
        name: "Test 1",
        username: "unTest",
        title: "Title test",
        value: 1,
        date: new Date("2021-10-02"),
        image: "uri",
        isPayed: true,
      },
    ];
    return asyncData(expectedPayments)
  }
}

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsComponent, PaginatePipe ],
      providers: [
        PaymentsComponent,
        { provide: PaymentService, useClass: MockPaymentService },
        { provide: BsModalService },
        { provide: PaginationService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
