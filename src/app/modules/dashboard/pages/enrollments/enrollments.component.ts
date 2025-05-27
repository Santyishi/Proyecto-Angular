import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentsService, Enrollment } from './enrollments.service';

@Component({
  selector: 'app-enrollments',
  standalone: false,
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  enrollmentForm: FormGroup;
  displayedColumns: string[] = ['id', 'student', 'course', 'date', 'actions'];
  enrollmentsList: Enrollment[] = [];

  constructor(
    private fb: FormBuilder,
    private enrollmentsService: EnrollmentsService
  ) {
    this.enrollmentForm = this.fb.group({
      student: [null, Validators.required],
      course: [null, Validators.required],
      date: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.enrollmentsService.getEnrollments().subscribe(data => {
      this.enrollmentsList = data;
    });
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    const newEnrollment: Enrollment = {
      id: this.generateSequentialEnrollmentId(),
      ...this.enrollmentForm.value
    };

    this.enrollmentsService.addEnrollment(newEnrollment).subscribe(() => {
      this.loadEnrollments();
      this.resetForm();
    });
  }

  onDelete(id: string): void {
    if (confirm("¿Seguro que deseas eliminar la inscripción?")) {
      this.enrollmentsService.deleteEnrollment(id).subscribe(() => {
        this.loadEnrollments();
      });
    }
  }

  resetForm(): void {
    this.enrollmentForm.reset();
    this.enrollmentForm.markAsPristine();
    this.enrollmentForm.markAsUntouched();
  }

  generateSequentialEnrollmentId(): string {
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

    return 'a' + chars.join('');
  }
}
