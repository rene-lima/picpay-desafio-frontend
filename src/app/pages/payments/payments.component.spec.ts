import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { TaskService } from 'src/app/services/task/task.service';

import { PaymentsComponent } from './payments.component';

class MockTaskService {
  listAll() {
    const transactions: any[] = [];
    return of(transactions);
  }

  listPage() {
    const transactions: any[] = [];
    return of(transactions);
  }
}

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentsComponent],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        BsModalService,
        PaginationService,
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
