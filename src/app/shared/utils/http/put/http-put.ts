import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export class HttpPut<In, Out = void> {
  constructor(private readonly http: HttpClient, public readonly endpoint: string) {}

  Put(entity: In, id: string): Observable<Out> {
    return this.http.put<Out>(this.endpoint.replace('{0}', id), entity)
  }
}
