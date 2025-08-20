import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

type LoginForm = FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
}>;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: LoginForm;
  error?: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/projects');
      return;
    }
    this.form = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    this.error = undefined;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { username, password } = this.form.getRawValue(); // ambos string
    const ok = this.auth.login(username, password);
    if (!ok) {
      this.error = 'Credenciales inválidas';
      return;
    }
    this.router.navigateByUrl('/projects');
  }

  // Getters tipados para el template
  get username() { return this.form.controls.username; }
  get password() { return this.form.controls.password; }
}
