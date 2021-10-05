import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PaymentResponse } from "src/app/_interfaces/payment-response";
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
    query: string = "",
    sort: string = "id",
    order: string = "asc"
  ): Observable<PaymentResponse> {
    const url = this.prefixUrl;
    const params: HttpParams = new HttpParams()
      .set("_page", page)
      .set("_limit", limit)
      .set("_sort", sort)
      .set("_order", order)
      .set("q", query);

    return this.http.get<PaymentResponse>(url, {
        observe: "response",
        params: params,
      }).pipe<PaymentResponse>(
        map(res => {
          const newRes: PaymentResponse = {
            payments: res.body as unknown as Payment[],
            totalPayments: Number(res.headers.get("X-Total-Count")),
          };
          return newRes;
        })
      );
  }

  public editPayment(payment: Payment): Observable<Payment> {
    const url = `${this.prefixUrl}/${payment.id}`;
    return this.http.put<Payment>(url, payment);
  }

  public editIsPayed(payment: Payment): Observable<Payment> {
    // Este método é apenas para demonstrar o uso do PATCH.
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
