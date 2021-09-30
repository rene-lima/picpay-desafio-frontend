import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentsService } from '@services/payments/payments.service';
import { ButtonModule } from '@shared/button/button.module';
import { of } from 'rxjs';

import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentDeleteComponent } from './payment-delete/payment-delete.component';
import { PaymentsFilterComponent } from './payments-filter/payments-filter.component';
import { PaymentsPaginationComponent } from './payments-pagination/payments-pagination.component';
import { PaymentsShowMoreComponent } from './payments-show-more/payments-show-more.component';
import { PaymentsTableComponent } from './payments-table/payments-table.component';
import { PaymentsComponent } from './payments.component';

const paymentMock = {
  id: 6,
  name: 'Hurleigh Malitrott',
  username: 'hmalitrott5',
  title: 'Developer IV',
  value: 43.62,
  date: '01/01/21',
  image: 'https://robohash.org/impeditconsequuntureveniet.png?size=150x150&set=set1',
  isPayed: true
};

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PaymentsComponent,
        PaymentsFilterComponent,
        PaymentsPaginationComponent,
        PaymentsShowMoreComponent,
        PaymentsTableComponent,
        PaymentAddComponent,
        PaymentDeleteComponent
      ],
      imports: [HttpClientTestingModule, MatDialogModule, ButtonModule],
      providers: [PaymentsService]
    }).compileComponents();
  });

  beforeEach(() => {
    paymentsService = TestBed.inject(PaymentsService);
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open dialog for delete payment', () => {
    const dialogRef = TestBed.inject(MatDialog);
    spyOn(dialogRef, 'open');
    spyOn(component, 'onDialogClose');

    component.onDelete(paymentMock);

    expect(dialogRef.open).toHaveBeenCalledWith(PaymentDeleteComponent, {
      data: paymentMock
    });

    expect(component.onDialogClose).toHaveBeenCalled();
  });

  it('should open dialog for edit payment', () => {
    const dialogRef = TestBed.inject(MatDialog);
    spyOn(dialogRef, 'open');
    spyOn(component, 'onDialogClose');

    component.onEdit(paymentMock);

    expect(dialogRef.open).toHaveBeenCalledWith(PaymentAddComponent, {
      data: paymentMock
    });

    expect(component.onDialogClose).toHaveBeenCalled();
  });

  it('should invoke changePaymentStatus method of paymentsService', () => {
    // mocking service return to always be an empty observable: of()
    spyOn(paymentsService, 'editPaymentStatus').and.returnValue(of());

    component.onPaymentChanged({ id: 1, isPayed: true });

    expect(paymentsService.editPaymentStatus).toHaveBeenCalledWith(1, true);
  });
});
