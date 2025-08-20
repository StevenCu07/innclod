import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

const LS_KEY = 'tasks.local';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  private _tasks$ = new BehaviorSubject<Task[]>(this.loadLocal());
  tasks$ = this._tasks$.asObservable();

  constructor(private http: HttpClient) {
    if (this._tasks$.value.length === 0) {
      this.hydrateFromApi();
    }
  }

  private hydrateFromApi(): void {
    this.http.get<any[]>(`${this.baseUrl}/todos`).pipe(
      map(todos => todos.map(t => ({
        id: t.id,
        title: t.title,
        completed: !!t.completed,
        projectId: Number(t.userId),
      }) as Task))
    ).subscribe(list => {
      this._tasks$.next(list);
      this.saveLocal(list);
    });
  }

private loadLocal(): Task[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];

    const parsed: any[] = JSON.parse(raw);
    let changed = false;

    const fixed: Task[] = parsed.map((t: any) => {
      if (typeof t.projectId !== 'number') {
        // Heurística estable para re-asignar (la API tenía userId 1..10)
        const pid = ((Number(t.id) - 1) % 10) + 1;
        changed = true;
        return { id: Number(t.id), title: String(t.title), completed: !!t.completed, projectId: pid };
      }
      return { id: Number(t.id), title: String(t.title), completed: !!t.completed, projectId: Number(t.projectId) };
    });

    if (changed) {
      this.saveLocal(fixed);
    }
    return fixed;
  } catch {
    return [];
  }
}


  private saveLocal(list: Task[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  getTasksByProject(projectId: number): Observable<Task[]> {
    return of(this._tasks$.value.filter(t => t.projectId === projectId));
  }

  createTask(data: Omit<Task, 'id'>, projectId: number): Observable<Task> {
    const list = [...this._tasks$.value];
    const newId = (list.at(-1)?.id ?? 0) + 1;
    const created: Task = { id: newId, ...data, projectId}; 
    list.push(created);
    this._tasks$.next(list);
    this.saveLocal(list);
    return of(created);
  }

  updateTask(id: number, data: Omit<Task, 'id'>): Observable<Task | undefined> {
    const list = this._tasks$.value.map(t =>
      t.id === id ? { ...t, ...data, id } : t 
    );
    this._tasks$.next(list);
    this.saveLocal(list);
    return of(list.find(t => t.id === id));
  }

  deleteTask(id: number): Observable<boolean> {
    const list = this._tasks$.value.filter(t => t.id !== id);
    this._tasks$.next(list);
    this.saveLocal(list);
    return of(true);
  }
}
