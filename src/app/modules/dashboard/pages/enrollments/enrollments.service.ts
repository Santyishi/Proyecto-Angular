import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Enrollment {
  id: string;
  student: string;
  course: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  private apiUrl = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${enrollment.id}`, enrollment);
  }

  deleteEnrollment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
