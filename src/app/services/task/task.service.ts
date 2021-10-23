import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrasactionsProps } from 'src/app/models/transaction/transaction.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient,) { }

  private readonly API = `${environment.API}tasks`;

  listAll() {
    return this.http.get<TrasactionsProps[]>(this.API);
  }

  listPage(page: number = 1, limit: number = 10) {
    return this.http.get<TrasactionsProps[]>(`${this.API}?_page=${page}&_limit=${limit}`);
  }
}

