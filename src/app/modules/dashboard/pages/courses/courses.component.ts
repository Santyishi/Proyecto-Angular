import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from './courses.service';
import { generateRandomString } from '../../../../Shared/utils';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone:false
})
export class CoursesComponent {
  courseForm: FormGroup;
  coursesList: Course[] = [];
  courseIdEdit: string | null = null;
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesList = [
      { id: 'c1', title: 'Angular Básico', description: 'Curso introductorio a Angular' },
      { id: 'c2', title: 'TypeScript Avanzado', description: 'Curso avanzado de TS' }
    ];
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const formValue = this.courseForm.value;

    if (this.courseIdEdit) {
      this.coursesList = this.coursesList.map(course =>
        course.id === this.courseIdEdit ? { id: this.courseIdEdit!, ...formValue } : course
      );
      this.courseIdEdit = null;
    } else {
      const newCourse: Course = {
        id: generateRandomString(6),
        ...formValue
      };
      this.coursesList = [...this.coursesList, newCourse];
    }

    this.resetForm();
  }

  onDelete(id: string): void {
    if (confirm("¿Eliminar curso?")) {
      this.coursesList = this.coursesList.filter(course => course.id !== id);
    }
  }

  onEdit(course: Course): void {
    this.courseIdEdit = course.id;
    this.courseForm.patchValue(course);
  }

  resetForm(): void {
    this.courseForm.reset({ title: null, description: null });
    Object.values(this.courseForm.controls).forEach(control => {
      control.setErrors(null);
      control.markAsPristine();
      control.markAsUntouched();
    });
  }
}
