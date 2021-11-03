import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskDTO} from '../../core/DTO/taskDTO';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IsDateService} from '../../service/is-date/is-date.service';

@Component({
  selector: 'app-value-range',
  templateUrl: './value-range.component.html',
  styleUrls: ['./value-range.component.scss']
})
export class ValueRangeComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ValueRangeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TaskDTO,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]]
    });
  }

  emitValueRange() {
    const dateRange = {
      valueStart: this.form.get('start').value,
      valueEnd: this.form.get('end').value
    };
    this.dialogRef.close(dateRange);
  }
}
