import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when button is clicked', () => {
    // spy on event emitter
    const submittedSpy = spyOn(component.clicked, 'emit');

    // query button and click it
    const anchorElement = fixture.debugElement.query(By.css('#button'));
    anchorElement.triggerEventHandler('click', null);
    const innerText = anchorElement.nativeElement.innerText;

    expect(submittedSpy).toHaveBeenCalled();
    expect(component.buttonLabel).toBeUndefined();
  });
});
