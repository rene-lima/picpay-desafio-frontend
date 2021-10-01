import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export class HttpPost<In, Out = void> {
  constructor(private readonly http: HttpClient, public readonly endpoint: string) {}

  Post(entity: In): Observable<Out> {
    return this.http.post<Out>(this.endpoint, entity)
  }
}
