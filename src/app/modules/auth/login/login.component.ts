import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { setUser } from '../../../../app/state/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        const user = this.authService.getUser();
        if (user) {
          this.store.dispatch(setUser({ user }));
        }
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Email o contraseña incorrectos';
      }
    });
  }
}
