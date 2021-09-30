import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentsService } from '@services/payments/payments.service';
import { ButtonComponent } from '@shared/button/button.component';
import { ButtonModule } from '@shared/button/button.module';
import { of } from 'rxjs';

import { PaymentDeleteComponent } from './payment-delete.component';

describe('PaymentDeleteComponent', () => {
  let component: PaymentDeleteComponent;
  let fixture: ComponentFixture<PaymentDeleteComponent>;
  let paymentsService: PaymentsService;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentDeleteComponent, ButtonComponent],
        imports: [HttpClientTestingModule, ButtonModule],
        providers: [
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: [] },
          PaymentsService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    paymentsService = TestBed.inject(PaymentsService);
    fixture = TestBed.createComponent(PaymentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should invoke payment service when confirm is submitted', () => {
    component.data = { id: 1 };

    // mocking service return to always be an empty observable: of()
    spyOn(paymentsService, 'delete').and.returnValue(of());

    component.onDelete();

    expect(paymentsService.delete).toHaveBeenCalledWith(1);
  });

  it('should close the dialog on cancel button', () => {
    fixture.nativeElement.querySelector('#cancel').click();
    fixture.detectChanges();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
