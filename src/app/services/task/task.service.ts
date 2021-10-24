import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrasactionsProps } from 'src/app/models/transaction.model';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private readonly API = `${environment.API}tasks`;

  listAll() {
    return this.http.get<TrasactionsProps[]>(this.API);
  }

  listPage(page: number = 1, limit: number = 10) {
    const params = {
      _page: page,
      _limit: limit,
    };
    return this.http.get<TrasactionsProps[]>(this.API, { params }).pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
