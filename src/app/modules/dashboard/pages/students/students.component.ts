import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student, StudentsService } from './students.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { StudentCoursesDialogComponent } from './student-courses-dialog/student-courses-dialog.component';

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
        id: this.generateSequentialId(),
        ...formValue
      };

      this.studentsService.addStudent(newStudent).subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
    }
  }

  generateSequentialId(): string {
    const existingIds = this.studentsList
      .map(s => s.id)
      .filter(id => /^[a-z]+[0-9]+$/i.test(id));

    const getLastIdParts = (id: string) => {
      const match = id.match(/^([a-z]+)(\d+)$/i);
      if (!match) return { prefix: 's', number: 0 };
      return {
        prefix: match[1],
        number: parseInt(match[2], 10)
      };
    };

    let maxPrefix = 's';
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

    return 's' + chars.join('');
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

    this.IdStudentEdit = null;
  }

  isAdmin(): boolean {
    return this.auth.getRole() === 'admin';
  }

  openCourses(studentId: string): void {
    this.matDialog.open(StudentCoursesDialogComponent, {
      data: studentId
    });
  }
}
