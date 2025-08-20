import { Injectable } from '@angular/core';

const KEY = 'isLoggedIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    login(): void {
    localStorage.setItem(KEY, 'true');
  }

  logout(): void {
    localStorage.removeItem(KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(KEY) === 'true';
  }

  constructor() { }
}
