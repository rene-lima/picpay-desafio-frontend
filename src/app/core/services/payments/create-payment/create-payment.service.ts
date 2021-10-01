import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import config from 'app/config/config'
import { CreatePayment } from 'app/core/entities/payment/payment.interface'
import { HttpPost } from 'app/shared/utils/http/post/http-post'

@Injectable()
export class CreatePaymentService extends HttpPost<CreatePayment> {
  constructor(http: HttpClient) {
    super(http, `${config.apiBaseUrl}/tasks`)
  }
}
