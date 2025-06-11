import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  addUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, user);
  }

  updateUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
