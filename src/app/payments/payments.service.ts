import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// API
import { API } from '../app.pi'
// Model
import { Task } from '../shared/model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private _http: HttpClient
  ) { }

  // Return tasks api
  getTasks() {
    return this._http.get<Task[]>(`${API}/tasks`);
  }

  // Create new task
  createTask(payment: Task) {
    return this._http.post(`${API}/tasks`, payment);
  }

  // Edit task 
  editTask(payment: Task) {
    return this._http.put(`${API}/tasks/${payment.id}`, payment);
  }

  // Delete task
  deleteTask(id: number) {
    return this._http.delete(`${API}/tasks/${id}`);
  }
}
