import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './students.service';
import { generateRandomString } from '../../../../Shared/utils';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {

  studentForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'email', 'phone', 'actions'];
  studentsList: Student[] = [];
  IdStudentEdit?: string | null = null;

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentsList = [
      {
        id: 'abc123',
        name: 'Juan',
        lastName: 'Pérez',
        age: 22,
        email: 'juan.perez@mail.com',
        phone: 12345678
      },
      {
        id: 'def456',
        name: 'María',
        lastName: 'Gómez',
        age: 24,
        email: 'maria.gomez@mail.com',
        phone: 87654321
      }
    ];
  }

  onSubmit(): void {
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

      this.studentsList = this.studentsList.map((student) =>
        student.id === this.IdStudentEdit ? updated : student
      );

      this.IdStudentEdit = null;
      this.resetForm();
    } else {
      const newStudent: Student = {
        id: generateRandomString(6),
        ...formValue
      };

      this.studentsList = [...this.studentsList, newStudent];
      this.resetForm();
    }
  }

  onDelete(id: string): void {
    if (confirm("¿Seguro que deseas eliminar el estudiante?")) {
      this.studentsList = this.studentsList.filter(s => s.id !== id);
    }
  }

  onEdit(student: Student): void {
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
    control.setErrors(null);          // ← Borra errores manuales
    control.markAsPristine();
    control.markAsUntouched();
  });
}
}
