import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TaskDTO} from '../../core/DTO/taskDTO';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  route = 'tasks';

  constructor(private http: HttpClient) { }

  getTask(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.route);
}
}
