import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPaginationComponent } from './payments-pagination.component';

describe('PaymentsPaginationComponent', () => {
  let component: PaymentsPaginationComponent;
  let fixture: ComponentFixture<PaymentsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsPaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
