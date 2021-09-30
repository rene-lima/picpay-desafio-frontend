import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Payment } from "src/app/_models/payment/payment";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private prefixUrl: string = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  public createPayment(payment: Payment): Observable<Payment> {
    const url = this.prefixUrl;
    return this.http.post<Payment>(url, payment);
  }

  public getPayments(
    page: number,
    limit: number,
    sort?: string,
    order?: string,
    query?: string
  ): Observable<Payment[]> {
    const url = this.prefixUrl;
    const params: HttpParams = new HttpParams();
    params.append("_page", page);
    params.append("_limit", limit);

    if (sort) params.append("_sort", sort);
    if (sort) params.append("_order", order);
    if (query) params.append("q", query);

    return this.http.get<Payment[]>(url, {
      params: params,
    });
  }

  public editPayment(payment: Payment): Observable<Payment> {
    const url = `${this.prefixUrl}/${payment.id}`;
    return this.http.put<Payment>(url, payment);
  }

  public editIsPayed(payment: Payment): Observable<Payment> {
    // Esse método é apenas para demonstrar o uso do PATCH.
    const url = `${this.prefixUrl}/${payment.id}`;
    const body = {
      isPayed: payment.isPayed,
    };
    return this.http.patch<Payment>(url, body);
  }

  public deletePayment(payment: Payment): Observable<any> {
    const url = `${this.prefixUrl}/${payment.id}`;
    return this.http.delete<any>(url);
  }
}
