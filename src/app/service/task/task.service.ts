import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TaskDTO} from '../../core/DTO/taskDTO';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ValueRange} from "../../core/DTO/valueRange";
import {validateAndRewriteCoreSymbol} from "@angular/compiler-cli/src/ngtsc/imports";
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  route = 'tasks';

  constructor(private http: HttpClient) { }

  getTask(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.route);
  }

  addTask(task: TaskDTO): Observable<TaskDTO> {
    return this.http.post<TaskDTO>(this.route, task);
  }

  updateTask(task: TaskDTO): Observable<TaskDTO> {
    return this.http.put<TaskDTO>(`${this.route}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<TaskDTO> {
    return this.http.delete<TaskDTO>(`${this.route}/${id}`);
  }
  getTasksValueRange(valueRange: ValueRange): Observable<TaskDTO[]> {
    const dateRangeCopy = {
      value_gte: valueRange.valueStart,
      value_lte: valueRange.valueEnd
    };
    const params = new HttpParams({fromObject: dateRangeCopy});

    return this.http.get<TaskDTO[]>(this.route, {params});
  }
}
