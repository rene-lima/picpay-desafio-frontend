import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(`${environment.API_URL}${endpoint}`, {
      params
    });
  }

  post<T>(endpoint: string, body: T): Observable<void> {
    return this.httpClient.post<void>(`${environment.API_URL}${endpoint}`, body);
  }

  put<T>(endpoint: string, body: T): Observable<void> {
    return this.httpClient.put<void>(`${environment.API_URL}${endpoint}`, body);
  }

  patch<T>(endpoint: string, body: T): Observable<T> {
    return this.httpClient.patch<T>(`${environment.API_URL}${endpoint}`, body);
  }

  delete(endpoint: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.API_URL}${endpoint}`);
  }
}
