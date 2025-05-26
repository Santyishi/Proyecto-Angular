import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Course {
  id: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [
    {
      id: 'a1',
      title: 'Angular Básico',
      description: 'Curso introductorio de Angular'
    },
    {
      id: 'a2',
      title: 'React Pro',
      description: 'Curso avanzado de React para desarrolladores'
    }
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  addCourse(course: Course): Observable<Course[]> {
    this.courses.push(course);
    return of(this.courses);
  }

  updateCourse(updated: Course): Observable<Course[]> {
    const index = this.courses.findIndex(c => c.id === updated.id);
    if (index !== -1) {
      this.courses[index] = updated;
    }
    return of(this.courses);
  }

  deleteCourse(id: string): Observable<Course[]> {
    this.courses = this.courses.filter(c => c.id !== id);
    return of(this.courses);
  }
}
