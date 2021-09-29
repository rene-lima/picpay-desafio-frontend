import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAddFormComponent } from './payment-add-form.component';

describe('PaymentAddFormComponent', () => {
  let component: PaymentAddFormComponent;
  let fixture: ComponentFixture<PaymentAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentAddFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
