import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { trimmedRequired, minLenTrimmed } from '../../../../shared/validators';


type LoginForm = FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
  remember: FormControl<boolean>;
}>;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: LoginForm;
  error?: string;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      username: this.fb.nonNullable.control('', { validators: [trimmedRequired, minLenTrimmed(3)] }),
      password: this.fb.nonNullable.control('', { validators: [trimmedRequired, minLenTrimmed(4)] }),
      remember: this.fb.nonNullable.control(false)
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/projects');
      return;
    }

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      const remembered = localStorage.getItem('auth.remember') === '1';
      this.form.patchValue({ remember: remembered });
      if (remembered) {
        const last = localStorage.getItem('auth.lastUsername');
        if (last) this.form.patchValue({ username: last });
      }
    }
  }

  onLogin(): void {
    this.error = undefined;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.loading = true;
    const { username, password, remember } = this.form.getRawValue();

    const ok = this.auth.login(username, password);
    if (!ok) {
      this.loading = false;
      this.error = 'Credenciales inválidas';
      return;
    }

    if (remember) localStorage.setItem('auth.lastUsername', username);
    else localStorage.removeItem('auth.lastUsername');

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/projects';
    this.router.navigateByUrl(returnUrl);
  }

  get f() { return this.form.controls; }
}
