
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Student {
  id: string;
  name: string;
  lastName: string;
  age: number;
  email: string;
  phone: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private students: Student[] = [
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

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }

  addStudent(student: Student): Observable<Student[]> {
    this.students.push(student);
    return of(this.students);
  }

updateStudent(updated: Student): Observable<Student[]> {
  console.log('Buscando ID:', updated.id); // 👀
  const index = this.students.findIndex(s => s.id === updated.id);
  console.log('Índice encontrado:', index); // 👀

  if (index !== -1) {
    this.students[index] = updated;
  }

  return of(this.students);
}

  deleteStudent(id: string): Observable<Student[]> {
    this.students = this.students.filter(s => s.id !== id);
    return of(this.students);
  }
}
