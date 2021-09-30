import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsFilterComponent } from './payments-filter.component';

describe('PaymentsFilterComponent', () => {
  let component: PaymentsFilterComponent;
  let fixture: ComponentFixture<PaymentsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include a search text, trigger button and emit value searched', () => {
    const nameToSearch = 'Patrick';
    // spy on event emitter
    const submittedSpy = spyOn(component.filtered, 'emit');

    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('input');

    // simulate user entering a new search into the input box
    searchInput.value = nameToSearch;

    // Dispatch a DOM event so that Angular learns of input value change.
    searchInput.dispatchEvent(new Event('input'));

    // trigger the click
    fixture.nativeElement.querySelector('#filter').click();
    fixture.detectChanges();

    expect(submittedSpy).toHaveBeenCalled();
    expect(submittedSpy).toHaveBeenCalledWith(nameToSearch);
  });
});
