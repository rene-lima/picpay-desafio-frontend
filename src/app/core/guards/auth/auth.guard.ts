import { Injectable } from '@angular/core'
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router'
import { StorageService } from 'app/core/services/storage/storage.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private readonly storageService: StorageService) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.storageService.get('user').pipe(
      map(res => {
        let user = JSON.parse(res)
        return user ? true : false
      })
    )
  }
}
