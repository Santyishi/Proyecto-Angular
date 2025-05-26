import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  private enrollments: Enrollment[] = [
    {
      id: 'e1',
      student: 'María López',
      course: 'Angular Básico',
      date: '2024-06-01'
    },
    {
      id: 'e2',
      student: 'Carlos Pérez',
      course: 'React Pro',
      date: '2024-06-10'
    }
  ];

  getEnrollments(): Observable<Enrollment[]> {
    return of(this.enrollments);
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment[]> {
    this.enrollments.push(enrollment);
    return of(this.enrollments);
  }

  updateEnrollment(updated: Enrollment): Observable<Enrollment[]> {
    const index = this.enrollments.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.enrollments[index] = updated;
    }
    return of(this.enrollments);
  }

  deleteEnrollment(id: string): Observable<Enrollment[]> {
    this.enrollments = this.enrollments.filter(e => e.id !== id);
    return of(this.enrollments);
  }
}
