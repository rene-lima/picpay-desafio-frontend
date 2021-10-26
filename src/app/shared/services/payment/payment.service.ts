import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }
  
  public getPayments(): Observable<Array<PaymentItem>> {

    return this.httpClient.get('http://localhost:3000/tasks').pipe(map( (response: Array<PaymentItem>) => {      
      return response;
    }))
  }
}
