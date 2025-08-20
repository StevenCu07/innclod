import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, BehaviorSubject } from 'rxjs';
import { Project } from '../models/project.model';

const LS_KEY = 'projects.local';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  private _projects$ = new BehaviorSubject<Project[]>(this.loadLocal());
  projects$ = this._projects$.asObservable();

  constructor(private http: HttpClient) {
    if (this._projects$.value.length === 0) {
      this.hydrateFromApi();
    }
  }

  private hydrateFromApi(): void {
    this.http.get<any[]>(`${this.baseUrl}/users`).pipe(
      map(users =>
        users.map(u => ({
          id: u.id,
          title: u.name,
          description: u?.company?.catchPhrase ?? u.email,
        }) as Project)
      )
    ).subscribe(list => {
      this._projects$.next(list);
      this.saveLocal(list);
    });
  }

  private loadLocal(): Project[] {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) as Project[] : [];
    } catch { return []; }
  }

  private saveLocal(list: Project[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectById(id: number): Observable<Project | undefined> {
    const found = this._projects$.value.find(p => p.id === id);
    return of(found);
  }

  createProject(data: Omit<Project, 'id'>): Observable<Project> {
    const list = [...this._projects$.value];
    const newId = (list.at(-1)?.id ?? 0) + 1;
    const created: Project = { id: newId, ...data };
    list.push(created);
    this._projects$.next(list);
    this.saveLocal(list);
    return of(created);
  }

  updateProject(id: number, data: Omit<Project, 'id'>): Observable<Project | undefined> {
    const list = this._projects$.value.map(p => p.id === id ? { id, ...data } : p);
    this._projects$.next(list);
    this.saveLocal(list);
    return of(list.find(p => p.id === id));
  }

  deleteProject(id: number): Observable<boolean> {
    const list = this._projects$.value.filter(p => p.id !== id);
    this._projects$.next(list);
    this.saveLocal(list);
    return of(true);
  }
}
