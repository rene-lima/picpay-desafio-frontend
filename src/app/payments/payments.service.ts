import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../app.pi'
import { Task } from '../shared/model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private _http: HttpClient
  ) { }

  getTasks() {
    return this, this._http.get<Task[]>(`${API}/tasks`);
  }

}
