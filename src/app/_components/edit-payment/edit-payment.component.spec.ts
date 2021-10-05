import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Payment } from 'src/app/_models/payment/payment';
import { PaymentService } from 'src/app/_services/payment/payment.service';
import { asyncData } from 'src/app/_testing/async-observable-helpers';

import { EditPaymentComponent } from './edit-payment.component';

class MockPaymentService {
  editPayment() {
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

describe('EditPaymentComponent', () => {
  let component: EditPaymentComponent;
  let fixture: ComponentFixture<EditPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaymentComponent ],
      providers: [
        { provide: PaymentService, useClass: MockPaymentService },
        { provide: BsModalRef },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
