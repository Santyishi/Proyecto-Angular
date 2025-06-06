import { createAction, props } from '@ngrx/store';
import { Student } from '../../modules/dashboard/pages/students/models/index';

// Cargar estudiantes (GET)
export const loadStudents = createAction('[Students] Load Students');
export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ students: Student[] }>()
);
export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{ error: any }>()
);

// Agregar estudiante (POST)
export const addStudent = createAction(
  '[Students] Add Student',
  props<{ student: Student }>()
);
export const addStudentSuccess = createAction(
  '[Students] Add Student Success',
  props<{ student: Student }>()
);
export const addStudentFailure = createAction(
  '[Students] Add Student Failure',
  props<{ error: any }>()
);

// Eliminar estudiante (DELETE)
export const deleteStudent = createAction(
  '[Students] Delete Student',
  props<{ id: string }>()
);
export const deleteStudentSuccess = createAction(
  '[Students] Delete Student Success',
  props<{ id: string }>()
);
export const deleteStudentFailure = createAction(
  '[Students] Delete Student Failure',
  props<{ error: any }>()
);
