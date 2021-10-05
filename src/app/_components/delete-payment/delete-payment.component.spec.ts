import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Payment } from 'src/app/_models/payment/payment';
import { PaymentService } from 'src/app/_services/payment/payment.service';
import { asyncData } from 'src/app/_testing/async-observable-helpers';

import { DeletePaymentComponent } from './delete-payment.component';

class MockPaymentService {
  deletePayment() {
    const expectedPayment: Payment = {
      id: 1,
      name: "Test 1",
      username: "unTest",
      title: "Title test",
      value: 1,
      date: new Date("2021-10-02"),
      image: "uri",
      isPayed: true,
    };
    return asyncData(expectedPayment);
  }
}

describe('DeletePaymentComponent', () => {
  let component: DeletePaymentComponent;
  let fixture: ComponentFixture<DeletePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePaymentComponent ],
      providers: [
        { provide: PaymentService, useClass: MockPaymentService },
        { provide: BsModalRef },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
