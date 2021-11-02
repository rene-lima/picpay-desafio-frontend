import { PaymentsService } from './../payments.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-filter-payment',
  templateUrl: './filter-payment.component.html',
  styleUrls: ['./filter-payment.component.scss']
})
export class FilterPaymentComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  maxValue;
  isPayed = false;
  isNotPayed = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FilterPaymentComponent>
  ) { }

  ngOnInit(): void {
  }

  onSave() {
    const filter = {
      start: this.range.get("start").value,
      end: this.range.get("end").value,
      maxValue: this.maxValue,
      isPayed: this.isPayed,
      isNotPayed: this.isNotPayed
    }


    this.dialogRef.close({ filter });

  }

}
