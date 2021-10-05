import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationTemplateComponent } from './pagination-template.component';

describe('PaginationTemplateComponent', () => {
  let component: PaginationTemplateComponent;
  let fixture: ComponentFixture<PaginationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationTemplateComponent);
    component = fixture.componentInstance;
    component.config = {
      id: 'test',
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 100
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
