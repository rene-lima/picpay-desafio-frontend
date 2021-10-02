import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import config from 'app/config/config'
import { HttpDeleteCommand } from 'app/shared/utils/http/delete/http-delete-command'

@Injectable()
export class DeletePaymentService extends HttpDeleteCommand {
  constructor(http: HttpClient) {
    super(http, `${config.apiBaseUrl}/tasks/{0}`)
  }
}
