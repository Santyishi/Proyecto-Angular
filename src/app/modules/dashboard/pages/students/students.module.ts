import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HelpersModule } from '../../../../Shared/helpers.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { studentsReducer } from '../../../../state/students/students.reducer';
import { StudentsEffects } from '../../../../state/students/students.effects';



@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    HelpersModule,
    MatDialogModule,
    EffectsModule.forFeature([StudentsEffects]),
    StoreModule.forFeature('students', studentsReducer),
  ],
})
export class StudentsModule {}
