import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import config from 'app/config/config'
import { Payment } from 'app/core/entities/payment/payment.interface'
import { HttpPut } from 'app/shared/utils/http/put/http-put'

@Injectable()
export class EditPaymentService extends HttpPut<Payment> {
  constructor(http: HttpClient) {
    super(http, `${config.apiBaseUrl}/tasks/{0}`)
  }
}
