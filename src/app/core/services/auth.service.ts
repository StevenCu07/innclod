import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth.user';

export interface AuthUser {
  id: number;
  username: string;
  name: string;
}

const USERS = [
  { id: 1, username: 'sofia', password: '1234', name: 'Sofia Herrera' },
  { id: 2, username: 'carlos',   password: '1234', name: 'Carlos Rodriguez' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly isBrowser: boolean;

  private _user$ = new BehaviorSubject<AuthUser | null>(null);
  user$ = this._user$.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this._user$.next(this.loadUser());
  }

  private getItem(key: string): string | null {
    if (!this.isBrowser) return null;
    try { return localStorage.getItem(key); } catch { return null; }
  }
  private setItem(key: string, val: string): void {
    if (!this.isBrowser) return;
    try { localStorage.setItem(key, val); } catch {}
  }
  private removeItem(key: string): void {
    if (!this.isBrowser) return;
    try { localStorage.removeItem(key); } catch {}
  }

  login(username: string, password: string): boolean {
    const f = USERS.find(u => u.username === username && u.password === password);
    if (!f) return false;
    const user: AuthUser = { id: f.id, username: f.username, name: f.name };
    this.setItem(USER_KEY, JSON.stringify(user));
    this._user$.next(user);
    return true;
  }

  logout(): void {
    this.removeItem(USER_KEY);
    this._user$.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getItem(USER_KEY);
  }

  currentUser(): AuthUser | null {
    return this._user$.value;
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = this.getItem(USER_KEY);
      return raw ? JSON.parse(raw) as AuthUser : null;
    } catch {
      return null;
    }
  }
}
