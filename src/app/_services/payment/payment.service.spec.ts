import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { PaymentResponse } from "src/app/_interfaces/payment-response";
import { Payment } from "src/app/_models/payment/payment";
import { asyncData } from "src/app/_testing/async-observable-helpers";
import { PaymentService } from "./payment.service";

describe("PaymentService", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: PaymentService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({
      providers: [
        PaymentService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(PaymentService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#getPayments should return expected payments (HttpClient called once)", (done: DoneFn) => {
    const expectedPayments: PaymentResponse = {
      payments: [
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
      ],
      totalPayments: 1,
    };

    httpClientSpy.get.and.returnValue(asyncData(expectedPayments));

    service.getPayments(1, 5).subscribe((payments) => {
      expect(payments).toEqual(expectedPayments, "expected payments");
      done();
    }, done.fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });
});
