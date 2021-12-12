import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
const PREFIX = 'Bearer';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    const token = JSON.parse(
      localStorage.getItem('currentUser') || (null as any)
    ).token;
    this.headers = new HttpHeaders({ Authorization: `${PREFIX} ${token} ` });
  }

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.api_url}/tasks`, {
      headers: this.headers,
    });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.api_url}/tasks`, task, {
      headers: this.headers,
    });
  }

  deleteTask(task: Task): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.api_url}/tasks`, {
      headers: this.headers,
      body: task,
    });
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.api_url}/tasks`, task, {
      headers: this.headers,
    });
  }
}
