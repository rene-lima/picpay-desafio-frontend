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

  it('should select a different "display more" and emit value changed', () => {
    const showMore = 10;
    // spy on event emitter
    const submittedSpy = spyOn(component.changed, 'emit');

    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');

    // simulate user changin a select value
    selectElement.value = String(showMore);

    // Dispatch a DOM event so that Angular learns of select value change.
    selectElement.dispatchEvent(new Event('change'));

    // trigger changes
    fixture.detectChanges();

    expect(submittedSpy).toHaveBeenCalled();
    expect(submittedSpy).toHaveBeenCalledWith(String(showMore));
  });
});
