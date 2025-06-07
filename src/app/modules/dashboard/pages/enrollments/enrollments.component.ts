import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentsService } from './enrollments.service';
import { AuthService } from '../../../../core/services/auth.service';
import { StudentsService, Student } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { Course } from '../courses/courses.model';
import { Enrollment } from './enrollments.model';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  enrollmentForm: FormGroup;
  displayedColumns: string[] = ['id', 'student', 'course', 'date', 'actions'];
  enrollmentsList: any[] = [];
  studentsList: Student[] = [];
  coursesList: Course[] = [];
  IdEnrollmentEdit?: string | null = null;

  constructor(
    private fb: FormBuilder,
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private auth: AuthService
  ) {
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
      date: [null, Validators.required],
      userId: [this.auth.getUser()?.id || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    forkJoin([
      this.studentsService.getStudents(),
      this.coursesService.getCourses(),
      this.enrollmentsService.getEnrollments()
    ]).subscribe(([students, courses, enrollments]) => {
      this.studentsList = students;
      this.coursesList = courses;

      const requests = enrollments.map(e =>
        forkJoin({
          student: this.studentsService.getStudentById(e.studentId),
          course: this.coursesService.getCourseById(e.courseId),
          enrollment: of(e)
        })
      );

      forkJoin(requests).subscribe(results => {
        this.enrollmentsList = results.map(r => ({
          ...r.enrollment,
          studentName: `${r.student.name} ${r.student.lastName}`,
          courseName: r.course.name
        }));
      });
    });
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    const formValue = this.enrollmentForm.value;

    if (this.IdEnrollmentEdit && this.isAdmin()) {
      const updated: Enrollment = {
        id: this.IdEnrollmentEdit,
        ...formValue
      };
      this.enrollmentsService.updateEnrollment(updated).subscribe(() => {
        this.IdEnrollmentEdit = null;
        this.resetForm();
        this.loadInitialData();
      });
    } else {
      const newEnrollment: Enrollment = {
        id: this.generateSequentialId(),
        ...formValue
      };
      this.enrollmentsService.addEnrollment(newEnrollment).subscribe(() => {
        this.resetForm();
        this.loadInitialData();
      });
    }
  }

  onDelete(id: string): void {
    if (confirm("¿Seguro que deseas eliminar la inscripción?")) {
      this.enrollmentsService.deleteEnrollment(id).subscribe(() => {
        this.loadInitialData();
      });
    }
  }

  onEdit(enrollment: Enrollment): void {
    if (!this.isAdmin()) return;

    this.IdEnrollmentEdit = enrollment.id;
    this.enrollmentForm.patchValue({
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      date: enrollment.date,
      userId: enrollment.userId
    });
  }

  resetForm(): void {
    this.enrollmentForm.reset({
      studentId: null,
      courseId: null,
      date: null,
      userId: this.auth.getUser()?.id || ''
    });
    this.IdEnrollmentEdit = null;
  }

  isAdmin(): boolean {
    return this.auth.getRole() === 'admin';
  }

  generateSequentialId(): string {
    const existingIds = this.enrollmentsList
      .map(e => e.id)
      .filter(id => /^[a-z]+[0-9]+$/i.test(id));

    const getLastIdParts = (id: string) => {
      const match = id.match(/^([a-z]+)(\d+)$/i);
      if (!match) return { prefix: 'e', number: 0 };
      return {
        prefix: match[1],
        number: parseInt(match[2], 10)
      };
    };

    let maxPrefix = 'e';
    let maxNumber = 0;

    existingIds.forEach(id => {
      const { prefix, number } = getLastIdParts(id);
      if (
        prefix.length > maxPrefix.length ||
        (prefix.length === maxPrefix.length && prefix > maxPrefix) ||
        (prefix === maxPrefix && number > maxNumber)
      ) {
        maxPrefix = prefix;
        maxNumber = number;
      }
    });

    if (maxNumber >= 10) {
      maxPrefix = this.nextPrefix(maxPrefix);
      maxNumber = 1;
    } else {
      maxNumber += 1;
    }

    return `${maxPrefix}${maxNumber}`;
  }

  nextPrefix(prefix: string): string {
    const chars = prefix.split('');
    let i = chars.length - 1;

    while (i >= 0) {
      if (chars[i] !== 'z') {
        chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
        return chars.join('');
      } else {
        chars[i] = 'a';
        i--;
      }
    }

    return 'e' + chars.join('');
  }
}
