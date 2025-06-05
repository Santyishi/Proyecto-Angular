import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, map } from 'rxjs';

export type UserRole = 'admin' | 'user';

export interface Usuario {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(true);
  private userSubject = new BehaviorSubject<Usuario | null>({
    id: 'dev1',
    name: 'Dev Temporal',
    email: 'dev@mail.com',
    password: '1234',
    role: 'admin'
  });

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    // Siempre retorna éxito con usuario dev temporal
    return of(true);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getRole(): UserRole | null {
    return this.userSubject.value?.role || null;
  }

  getRole$(): Observable<UserRole | null> {
    return this.userSubject.asObservable().pipe(map(user => user?.role || null));
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  getUser(): Usuario | null {
    return this.userSubject.value;
  }

  getUser$(): Observable<Usuario | null> {
    return this.userSubject.asObservable();
  }
}
