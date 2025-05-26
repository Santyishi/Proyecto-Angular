import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'admin' | 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<UserRole | null>(null);

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Simulación de login hardcodeado
    if (username === 'admin' && password === 'admin') {
      this.isLoggedInSubject.next(true);
      this.userRoleSubject.next('admin');
      return true;
    } else if (username === 'user' && password === 'user') {
      this.isLoggedInSubject.next(true);
      this.userRoleSubject.next('user');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getRole(): UserRole | null {
    return this.userRoleSubject.value;
  }

  getRole$(): Observable<UserRole | null> {
    return this.userRoleSubject.asObservable();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}
