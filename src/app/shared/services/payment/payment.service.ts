import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentItemModel } from '../../models/payment/payment-item.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }
  
  public getPayments(): Observable<Array<PaymentItemModel>> {

    return this.httpClient.get('http://localhost:3000/tasks').pipe(map( (response: Array<PaymentItemModel>) => {      
      return response;
    }))
  }
}
