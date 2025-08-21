import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanMatch {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.check(state.url);
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    const url = '/' + segments.map(s => s.path).join('/');
    return this.check(url);
  }

  private check(url: string): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/auth'], { queryParams: { returnUrl: url } });
    return false;
  }
}
