import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnrollmentsService } from '../../enrollments/enrollments.service';
import { CoursesService } from '../../courses/courses.service';
import { Enrollment } from '../../enrollments/enrollments.model';
import { Course } from '../../courses/courses.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-courses-dialog',
  templateUrl: './student-courses-dialog.component.html',
  standalone: false
})
export class StudentCoursesDialogComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public studentId: string,
    private dialogRef: MatDialogRef<StudentCoursesDialogComponent>,
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
  this.enrollmentsService.getEnrollmentsByStudentId(this.studentId).subscribe(enrollments => {
    if (!enrollments.length) {
      this.courses = [];
      return;
    }

    const courseRequests = enrollments.map(e =>
      this.coursesService.getCourseById(e.courseId)
    );

    forkJoin(courseRequests).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {
        console.error('Error al traer cursos:', err);
        this.courses = [];
      }
    });
  }, error => {
    console.error('Error al traer inscripciones:', error);
    this.courses = [];
  });
}


  close(): void {
    this.dialogRef.close();
  }
}
