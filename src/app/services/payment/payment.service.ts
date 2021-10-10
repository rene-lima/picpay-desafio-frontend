import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>("http://localhost:3000/tasks");
  }

  getPaymentById(paymentId: Number): Observable<Payment> {
    return this.http.get<Payment>(`http://localhost:3000/tasks/${paymentId}`);
  }

  createPayment(payment: Payment): Observable<Payment>{
    const preparedObject = this.prepareObject(payment);
    return this.http.post<Payment>("http://localhost:3000/tasks", JSON.stringify(preparedObject), this.httpOptions)
  }

  editPayment(payment: Payment): Observable<Payment> {
    const preparedObject = this.prepareObject(payment);
    return this.http.put<Payment>(`http://localhost:3000/tasks/${payment.id}`, JSON.stringify(preparedObject), this.httpOptions)
  }

  prepareObject(payment: Payment): Payment {
    payment.name = payment?.name ?? payment.username;
    payment.image = payment?.image ?? "";

    payment.date = new Date(payment.date); 

    return payment;
  }
}
