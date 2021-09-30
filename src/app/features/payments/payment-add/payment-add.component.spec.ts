import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentsService } from '@services/payments/payments.service';
import { ButtonComponent } from '@shared/button/button.component';
import { ButtonModule } from '@shared/button/button.module';
import { of } from 'rxjs';

import { PaymentAddFormComponent } from './payment-add-form/payment-add-form.component';
import { PaymentAddComponent } from './payment-add.component';

describe('PaymentAddComponent', () => {
  let component: PaymentAddComponent;
  let fixture: ComponentFixture<PaymentAddComponent>;
  let paymentsService: PaymentsService;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentAddComponent, PaymentAddFormComponent, ButtonComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ButtonModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        PaymentsService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    paymentsService = TestBed.inject(PaymentsService);
    fixture = TestBed.createComponent(PaymentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render form with all inputs and buttons', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#username')).toBeTruthy();
    expect(element.querySelector('#value')).toBeTruthy();
    expect(element.querySelector('#date')).toBeTruthy();
    expect(element.querySelector('#title')).toBeTruthy();
    expect(element.querySelector('#cancel')).toBeTruthy();
    expect(element.querySelector('#save')).toBeTruthy();
  });

  it('should return model invalid when form is empty', () => {
    expect(component.paymentAddForm.valid).toBeFalsy();
  });

  it('should validate username input as required', () => {
    const username = component.paymentAddForm.controls.username;

    expect(username.valid).toBeFalsy();
    expect(username.errors?.required).toBeTruthy();
  });

  it('should validate value input as required', () => {
    const value = component.paymentAddForm.controls.value;

    expect(value.valid).toBeFalsy();
    expect(value.errors?.required).toBeTruthy();
  });

  it('should validate date input as required', () => {
    const date = component.paymentAddForm.controls.date;

    // empty date input
    date.setValue('');

    expect(date.valid).toBeFalsy();
    expect(date.errors?.required).toBeTruthy();
  });

  it('should validate title input as optional', () => {
    const title = component.paymentAddForm.controls.title;

    expect(title.valid).toBeTruthy();
  });

  it('should render username validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#username-required')).toBeFalsy();

    elements.querySelector<HTMLInputElement>('#username')?.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(elements.querySelector('#username-required')).toBeTruthy();
    expect(elements.querySelector('#username-required')?.textContent).toContain('Username é obrigatório.');
  });

  it('should render value validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#value-required')).toBeFalsy();

    elements.querySelector<HTMLInputElement>('#value')?.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(elements.querySelector('#value-required')).toBeTruthy();
    expect(elements.querySelector('#value-required')?.textContent).toContain('Valor é obrigatório.');
  });

  it('should render date validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#date-required')).toBeFalsy();

    // empty date input
    const date = component.paymentAddForm.controls.date;
    date.setValue('');

    elements.querySelector<HTMLInputElement>('#date')?.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(elements.querySelector('#date-required')).toBeTruthy();
    expect(elements.querySelector('#date-required')?.textContent).toContain('Data é obrigatória.');
  });

  it('should invoke payment service when form is valid', () => {
    const username = component.paymentAddForm.controls.username;
    username.setValue('patrickgdl');
    const date = component.paymentAddForm.controls.date;
    date.setValue(new Date());
    const value = component.paymentAddForm.controls.value;
    value.setValue(18.53);

    // mocking service return to always be an empty observable: of()
    spyOn(paymentsService, 'create').and.returnValue(of());

    component.onSubmit(component.paymentAddForm);

    expect(paymentsService.create).toHaveBeenCalledWith({
      username: username.value,
      date: date.value,
      value: value.value,
      title: ''
    });
  });

  it('should close the dialog on cancel button', () => {
    fixture.nativeElement.querySelector('#cancel').click();
    fixture.detectChanges();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
