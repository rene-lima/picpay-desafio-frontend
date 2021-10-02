import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export class HttpDeleteCommand<Out = void> {
  constructor(private readonly http: HttpClient, public readonly endpoint: string) {}

  Delete(id: string): Observable<Out> {
    return this.http.delete<Out>(this.endpoint.replace('{0}', id))
  }
}
