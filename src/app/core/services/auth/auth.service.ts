import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import config from 'app/config/config'
import { User } from 'app/core/entities/user/user.interface'
import { StorageService } from 'app/core/services/storage/storage.service'
import { HttpGet } from 'app/shared/utils/http/get/http-get'
import { QueryFilter } from 'app/shared/utils/http/query-filter.interface'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpGet<User[]> {
  readonly userIsAuthenticated = new Subject<boolean>()

  constructor(http: HttpClient, private readonly storageService: StorageService, private readonly router: Router) {
    super(http, `${config.apiBaseUrl}/account`)
  }

  authenticateUser(filters: QueryFilter[]): void {
    this.setQueryFilter(filters)
    this.Get().subscribe(res => {
      if (!res?.body?.length) {
        this.userIsAuthenticated.next(false)
        return
      }

      let user: string

      try {
        user = JSON.stringify(res.body[0])
      } catch (e) {
        throw new Error(`Cannot serialize user: ${e}`)
      }

      this.storageService.set('user', user)
      this.userIsAuthenticated.next(true)
    })
  }

  logoutUser(): void {
    this.storageService.clear()
    this.userIsAuthenticated.next(false)
    this.router.navigateByUrl('/')
  }
}
