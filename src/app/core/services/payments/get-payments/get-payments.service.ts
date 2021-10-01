import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { HttpGet } from 'app/shared/utils/http/get/http-get'
import { Payment } from 'app/core/entities/payment/payment.interface'
import config from 'app/config/config'

@Injectable()
export class GetPaymentsService extends HttpGet<Payment[]> {
  constructor(http: HttpClient) {
    super(http, `${config.apiBaseUrl}/tasks`)
  }
}
