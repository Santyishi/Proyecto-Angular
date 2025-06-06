import { Student } from '../../modules/dashboard/pages/students/models/index';

export interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

export const initialStudentsState: StudentsState = {
  students: [],
  loading: false,
  error: null
};
