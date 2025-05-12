import { Injectable } from '@angular/core';

export interface Course {
  id: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [];

  getCourses(): Course[] {
    return this.courses;
  }
}
