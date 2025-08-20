import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth.user';

export interface AuthUser {
  id: number;
  username: string;
  name: string;
}

const USERS = [
  { id: 1, username: 'alice', password: '1234', name: 'Alice Doe' },
  { id: 2, username: 'bob',   password: '1234', name: 'Bob Smith' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<AuthUser | null>(this.loadUser());
  user$ = this._user$.asObservable();

  login(username: string, password: string): boolean {
    const f = USERS.find(u => u.username === username && u.password === password);
    if (!f) return false;
    const user: AuthUser = { id: f.id, username: f.username, name: f.name };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user$.next(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem(USER_KEY);
    this._user$.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(USER_KEY);
  }

  currentUser(): AuthUser | null {
    return this._user$.value;
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) as AuthUser : null;
    } catch {
      return null;
    }
  }
}
