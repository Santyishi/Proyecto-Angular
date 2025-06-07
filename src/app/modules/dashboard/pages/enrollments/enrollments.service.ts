import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from './enrollments.model';

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
  getEnrollmentsByStudentId(studentId: string): Observable<Enrollment[]> {
  return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${studentId}`);
  }
  getEnrollmentsByCourseId(courseId: string): Observable<Enrollment[]> {
  return this.http.get<Enrollment[]>(`${this.apiUrl}?courseId=${courseId}`);
  }

}
