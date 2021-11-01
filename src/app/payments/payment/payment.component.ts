import { AddPaymentComponent } from './../add-payment/add-payment.component';
import { DeletePaymentComponent } from './../delete-payment/delete-payment.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  displayedColumns: string[] = ['user', 'title', 'date', 'value', 'paid', 'buttons'];


  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(AddPaymentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
