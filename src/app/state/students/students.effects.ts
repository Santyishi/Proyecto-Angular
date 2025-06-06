import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { StudentsService } from '../../modules/dashboard/pages/students/students.service';
import * as StudentsActions from './students.actions';


@Injectable()
export class StudentsEffects {
  constructor(
    private actions$: Actions,
    private studentsService: StudentsService
    
  ) 
  {
    console.log('✅ actions$', this.actions$); // 👈 esto te muestra si se inyectó bien
  }

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      mergeMap(() =>
        this.studentsService.getStudents().pipe(
          map((students) => StudentsActions.loadStudentsSuccess({ students })),
          catchError((error) => of(StudentsActions.loadStudentsFailure({ error })))
        )
      )
    )
  );
  
  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.addStudent),
      mergeMap(({ student }) =>
        this.studentsService.addStudent(student).pipe(
          map((newStudent) => StudentsActions.addStudentSuccess({ student: newStudent })),
          catchError((error) => of(StudentsActions.addStudentFailure({ error })))
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      mergeMap(({ id }) =>
        this.studentsService.deleteStudent(id).pipe(
          map(() => StudentsActions.deleteStudentSuccess({ id })),
          catchError((error) => of(StudentsActions.deleteStudentFailure({ error })))
        )
      )
    )
  );
}
