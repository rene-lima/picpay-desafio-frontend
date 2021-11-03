import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueRangeComponent } from './value-range.component';

describe('DateRangeComponent', () => {
  let component: ValueRangeComponent;
  let fixture: ComponentFixture<ValueRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
