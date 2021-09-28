import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsShowMoreComponent } from './payments-show-more.component';

describe('PaymentsShowMoreComponent', () => {
  let component: PaymentsShowMoreComponent;
  let fixture: ComponentFixture<PaymentsShowMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsShowMoreComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsShowMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
