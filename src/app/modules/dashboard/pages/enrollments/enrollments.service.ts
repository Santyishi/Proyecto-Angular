import { Injectable } from '@angular/core';

export interface Enrollment {
  id: string;
  student: string;
  course: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  private enrollments: Enrollment[] = [];

  getEnrollments(): Enrollment[] {
    return this.enrollments;
  }
}
