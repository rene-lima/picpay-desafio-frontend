import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Payment } from "src/app/_models/payment/payment";
import { PaymentService } from "src/app/_services/payment/payment.service";
import { asyncData } from "src/app/_testing/async-observable-helpers";

import { AddPaymentComponent } from "./add-payment.component";

class MockPaymentService {
  createPayment() {
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

describe("AddPaymentComponent", () => {
  let component: AddPaymentComponent;
  let fixture: ComponentFixture<AddPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPaymentComponent],
      providers: [
        { provide: PaymentService, useClass: MockPaymentService },
        { provide: BsModalRef },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
