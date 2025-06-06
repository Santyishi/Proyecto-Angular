import { createReducer, on } from '@ngrx/store';
import { Student } from '../../modules/dashboard/pages/students/models/index';
import * as StudentsActions from './students.actions';

export interface StudentsState {
  students: Student[];
  loading: boolean;
  error: any;
}

export const initialStudentsState: StudentsState = {
  students: [],
  loading: false,
  error: null
};

export const studentsReducer = createReducer(
  initialStudentsState,

  on(StudentsActions.loadStudents, state => ({
    ...state,
    loading: true
  })),

  on(StudentsActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loading: false
  })),

  on(StudentsActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(StudentsActions.addStudentSuccess, (state, { student }) => ({
    ...state,
    students: [...state.students, student]
  })),

  on(StudentsActions.deleteStudentSuccess, (state, { id }) => ({
    ...state,
    students: state.students.filter(s => s.id !== id)
  }))
);
