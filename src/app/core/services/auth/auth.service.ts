import { HttpClient } from '@angular/common/http'
import { EventEmitter, Injectable } from '@angular/core'
import config from 'app/config/config'
import { User } from 'app/core/entities/user/user.interface'
import { HttpGet } from 'app/shared/utils/http/get/http-get'
import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'

@Injectable()
export class AuthService extends HttpGet<User[]> {
  userIsAuthenticated = new EventEmitter<boolean>()

  constructor(http: HttpClient) {
    super(http, `${config.apiBaseUrl}/account`)
  }

  authenticateUser(filters: QueryFilter[]): void {
    this.setQueryFilter(filters)
    this.Get().subscribe(res => {
      this.userIsAuthenticated.emit(res.body.length ? true : false)
    })
  }
}
