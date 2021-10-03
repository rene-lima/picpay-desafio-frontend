import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {

  constructor(private http:HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>("http://localhost:3000/tasks");
  }

}
