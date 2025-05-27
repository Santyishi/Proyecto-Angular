import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student, StudentsService } from './students.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';

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
    private matDialog: MatDialog,
    private studentsService: StudentsService,
    private auth: AuthService
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
    this.studentsService.getStudents().subscribe(data => {
      this.studentsList = data;
    });
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

      this.studentsService.updateStudent(updated).subscribe(() => {
        this.loadStudents();
        this.IdStudentEdit = null;
        this.resetForm();
      });
    } else {
      const newStudent: Student = {
        id: crypto.randomUUID(),
        ...formValue
      };

      this.studentsService.addStudent(newStudent).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  onDelete(id: string): void {
    if (!this.isAdmin()) return;

    if (confirm("¿Seguro que deseas eliminar el estudiante?")) {
      this.studentsService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
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
