import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`).pipe(
      map(users =>
        users.map(u => ({
          id: u.id,
          title: u.name,
          description: u?.company?.catchPhrase ?? u.email,
        }) as Project)
      )
    );
  }
}
