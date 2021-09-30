import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

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

  it('should emit a selected page number when page clicked', fakeAsync(() => {
    // spy on event emitter
    const submittedSpy = spyOn(component.paginationClicked, 'emit');

    // query anchor button diff from selected and click it
    const anchorElement = fixture.debugElement.query(By.css('#page-2'));
    anchorElement.triggerEventHandler('click', null);
    const currentPage = anchorElement.nativeElement.innerText;

    expect(submittedSpy).toHaveBeenCalled();
    expect(submittedSpy).toHaveBeenCalledWith(+currentPage);
  }));

  it('should emit a page prior to the selected one when previous button is clicked', () => {
    const customPageSelected = 2;
    const previousPage = customPageSelected - 1;

    // set a different initial selected page
    component.pageSelected = customPageSelected;
    fixture.detectChanges();

    // spy on event emitter and onClick event
    const submittedSpy = spyOn(component.paginationClicked, 'emit');

    // query 'next' button and click it
    const anchorElement = fixture.debugElement.query(By.css('#previous'));
    anchorElement.triggerEventHandler('click', null);

    expect(submittedSpy).toHaveBeenCalled();
    expect(submittedSpy).toHaveBeenCalledWith(previousPage);

    expect(component.pageSelected).toBe(previousPage);
  });

  it('should emit a page after the selected one when next button is clicked', () => {
    const nextPage = component.pageSelected + 1;

    // spy on event emitter and onClick event
    const submittedSpy = spyOn(component.paginationClicked, 'emit');

    // query 'next' button and click it
    const anchorElement = fixture.debugElement.query(By.css('#next'));
    anchorElement.triggerEventHandler('click', null);

    expect(submittedSpy).toHaveBeenCalled();
    expect(submittedSpy).toHaveBeenCalledWith(nextPage);

    expect(component.pageSelected).toBe(nextPage);
  });
});
