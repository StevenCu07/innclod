import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from './core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<AuthUser | null>;

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.user$;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth');
  }
}
