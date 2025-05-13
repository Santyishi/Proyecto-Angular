import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enrollment } from './enrollments.service';
import { generateRandomString } from '../../../../Shared/utils';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
  standalone: false
})
export class EnrollmentsComponent {
  enrollmentForm: FormGroup;
  enrollmentsList: Enrollment[] = [];
  enrollmentIdEdit: string | null = null;
  displayedColumns: string[] = ['id', 'student', 'course', 'actions'];

  constructor(private fb: FormBuilder) {
    this.enrollmentForm = this.fb.group({
      student: [null, Validators.required],
      course: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.enrollmentsList = [
      { id: 'e1', student: 'Juan Pérez', course: 'Angular Básico' },
      { id: 'e2', student: 'María Gómez', course: 'TypeScript Avanzado' }
    ];
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    const formValue = this.enrollmentForm.value;

    if (this.enrollmentIdEdit) {
      this.enrollmentsList = this.enrollmentsList.map(e =>
        e.id === this.enrollmentIdEdit ? { id: this.enrollmentIdEdit!, ...formValue } : e
      );
      this.enrollmentIdEdit = null;
    } else {
      const newEnrollment: Enrollment = {
        id: generateRandomString(6),
        ...formValue
      };
      this.enrollmentsList = [...this.enrollmentsList, newEnrollment];
    }

    this.resetForm();
  }

  onDelete(id: string): void {
    if (confirm("¿Eliminar inscripción?")) {
      this.enrollmentsList = this.enrollmentsList.filter(e => e.id !== id);
    }
  }

  onEdit(enrollment: Enrollment): void {
    this.enrollmentIdEdit = enrollment.id;
    this.enrollmentForm.patchValue(enrollment);
  }

  resetForm(): void {
    this.enrollmentForm.reset({ student: null, course: null });
    Object.values(this.enrollmentForm.controls).forEach(control => {
      control.setErrors(null);
      control.markAsPristine();
      control.markAsUntouched();
    });
  }
}
