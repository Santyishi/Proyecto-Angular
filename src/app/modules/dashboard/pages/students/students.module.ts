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
import { StudentCoursesDialogComponent } from './student-courses-dialog/student-courses-dialog.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentCoursesDialogComponent
  ],
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
    MatDialogModule
  ]
})
export class StudentsModule {}
