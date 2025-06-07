import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnrollmentsService } from '../../enrollments/enrollments.service';
import { StudentsService } from '../../students/students.service';
import { Student } from '../../students/students.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-course-students-dialog',
  templateUrl: './course-students-dialog.component.html',
  standalone: false
})
export class CourseStudentsDialogComponent implements OnInit {
  students: Student[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public courseId: string,
    private dialogRef: MatDialogRef<CourseStudentsDialogComponent>,
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.enrollmentsService.getEnrollmentsByCourseId(this.courseId).subscribe(enrollments => {
      if (!enrollments.length) {
        this.students = [];
        return;
      }

      const studentRequests = enrollments.map(e =>
        this.studentsService.getStudentById(e.studentId)
      );

      forkJoin(studentRequests).subscribe({
        next: (students) => {
          this.students = students;
        },
        error: () => {
          this.students = [];
        }
      });
    }, () => {
      this.students = [];
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
