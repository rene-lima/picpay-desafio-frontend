import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import config from 'app/config/config'
import { Payment } from 'app/core/entities/payment/payment.interface'
import { HttpGet } from 'app/shared/utils/http/get/http-get'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { QueryFilter } from './../../../../shared/utils/http/query-filter.interface'

@Injectable()
export class GetPaymentsService extends HttpGet<Payment[]> {
  private defaultFilters: QueryFilter[] = [{ field: '_page', value: '1' }]

  constructor(http: HttpClient) {
    super(http, `${config.apiBaseUrl}/tasks`)
  }

  getPayments(
    filters: QueryFilter[] = this.defaultFilters
  ): Observable<{ payments: Payment[]; totalPayments: number }> {
    this.setQueryFilter(filters)
    return this.Get().pipe(
      map(res => {
        return {
          payments: res.body,
          totalPayments: Number(res.headers.get('X-Total-Count'))
        }
      })
    )
  }
}
