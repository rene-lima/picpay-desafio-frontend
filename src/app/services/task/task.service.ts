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

  list() {
    return this.http.get<TrasactionsProps[]>(this.API);
  }
}

