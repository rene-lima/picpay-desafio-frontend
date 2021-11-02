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

  constructor(
    public dialog: MatDialog,
    private _paymentService: PaymentsService,
    public dialogRef: MatDialogRef<FilterPaymentComponent>
  ) { }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
