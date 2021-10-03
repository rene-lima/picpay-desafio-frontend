import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  set(key: string, data: string): void {
    sessionStorage.setItem(key, data)
  }

  get(key: string): Observable<string> {
    return of(sessionStorage.getItem(key))
  }

  clear(): void {
    sessionStorage.clear()
  }
}
