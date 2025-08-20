import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<any[]>(`${this.baseUrl}/todos`, {
      params: { userId: String(projectId) }
    }).pipe(
      map(todos => todos.map(t => ({
        id: t.id,
        title: t.title,
        completed: !!t.completed
      }) as Task))
    );
  }
}
