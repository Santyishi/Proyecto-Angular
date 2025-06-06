import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../students/models/index';
import { AuthService } from '../../../../core/services/auth.service';
import * as StudentsActions from '../../../../state/students/students.actions';
import { selectAllStudents } from '../../../../state/students/students.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  standalone: false
})
export class StudentsComponent implements OnInit {
  studentForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'email', 'phone', 'actions'];
  students$: Observable<Student[]>;
  IdStudentEdit?: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private auth: AuthService
  ) {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
    });

    this.students$ = this.store.select(selectAllStudents);
  }

  ngOnInit(): void {
    this.store.dispatch(StudentsActions.loadStudents());
  }

  onSubmit(): void {
    if (!this.isAdmin()) return;

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formValue = this.studentForm.value;

    if (this.IdStudentEdit) {
      const updated: Student = {
        id: this.IdStudentEdit,
        ...formValue
      };

      this.IdStudentEdit = null;
      this.resetForm();
    } else {
      const newStudent: Student = {
        id: crypto.randomUUID(),
        ...formValue
      };

      this.store.dispatch(StudentsActions.addStudent({ student: newStudent }));
      this.resetForm();
    }
  }

  onDelete(id: string): void {
    if (!this.isAdmin()) return;

    if (confirm("¿Seguro que deseas eliminar el estudiante?")) {
      this.store.dispatch(StudentsActions.deleteStudent({ id }));
    }
  }

  onEdit(student: Student): void {
    if (!this.isAdmin()) return;

    this.IdStudentEdit = student.id;
    this.studentForm.patchValue({
      name: student.name,
      lastName: student.lastName,
      age: student.age,
      phone: student.phone,
      email: student.email,
    });
  }

  resetForm(): void {
    this.studentForm.reset({
      name: null,
      lastName: null,
      age: null,
      email: null,
      phone: null
    });

    Object.values(this.studentForm.controls).forEach(control => {
      control.setErrors(null);
      control.markAsPristine();
      control.markAsUntouched();
    });
  }

  isAdmin(): boolean {
    return this.auth.getRole() === 'admin';
  }
}
