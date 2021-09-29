import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '@models/payments/payment.interface';
import { ApiService } from '@services/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  constructor(private apiService: ApiService) {}

  get(page: number, filter = '', sortOrder = '', sortField = '', limit: number): Observable<Payment[]> {
    const params = new HttpParams()
      .set('_page', page)
      .set('name_like', filter)
      .set('_order', sortOrder)
      .set('_sort', sortField)
      .set('_limit', limit);
    return this.apiService.get<Payment[]>('tasks', params);
  }

  filterByName(filter = ''): Observable<Payment[]> {
    const params = new HttpParams().set('name_like', filter);
    return this.apiService.get<Payment[]>('tasks', params);
  }

  editPaymentStatus(id: number, isPayed: boolean): Observable<Partial<Payment>> {
    return this.apiService.patch<Partial<Payment>>(`tasks/${id}`, {
      isPayed
    });
  }

  edit(id: number, payment: Payment): Observable<Payment> {
    return this.apiService.patch<Payment>(`tasks/${id}`, payment);
  }

  create(payment: Payment): Observable<void> {
    return this.apiService.post<Payment>('tasks', payment);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(`tasks/${id}`);
  }
}
