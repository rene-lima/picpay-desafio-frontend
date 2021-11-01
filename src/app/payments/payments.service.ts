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
    return this._http.get<Task[]>(`${API}/tasks`);
  }

  createTask(payment: Task) {
    return this._http.post(`${API}/tasks`, payment);
  }

  editTask(payment: Task) {
    return this._http.put(`${API}/tasks/${payment.id}`, payment);
  }

  deleteTask(id: number) {
    return this._http.delete(`${API}/tasks/${id}`);
  }
}
