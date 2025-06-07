import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export type UserRole = 'admin' | 'user';

export interface Usuario {
  id: string;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length === 1) {
          this.userSubject.next(users[0]);
          this.isLoggedInSubject.next(true);
          return true;
        } else {
          return false;
        }
      })
    );
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
