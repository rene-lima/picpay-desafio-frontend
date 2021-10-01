import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { QueryFilter } from '../query-filter.interface'

export class HttpGet<Out> {
  private httpParams?: HttpParams

  constructor(private readonly http: HttpClient, public readonly endpoint: string) {}

  setQueryFilter(filters: QueryFilter[]): void {
    this.httpParams = new HttpParams()

    filters.forEach(filter => {
      this.httpParams = this.httpParams.set(filter.field, filter.value)
    })
  }

  Get(): Observable<Out> {
    return this.http.get<Out>(this.endpoint, { params: this.httpParams })
  }
}
