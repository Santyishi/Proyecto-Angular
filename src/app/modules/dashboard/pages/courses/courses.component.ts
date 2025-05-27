import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService, Course } from './courses.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  courseForm: FormGroup;
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  coursesList: Course[] = [];
  IdCourseEdit?: string | null = null;

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private coursesService: CoursesService,
    private auth: AuthService
  ) {
    this.courseForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe(data => {
      this.coursesList = [...data];
    });
  }

  onSubmit(): void {
    if (!this.isAdmin()) return;

    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const formValue = this.courseForm.value;

    if (this.IdCourseEdit) {
      const updated: Course = {
        id: this.IdCourseEdit,
        ...formValue
      };
      this.coursesService.updateCourse(updated).subscribe(() => {
        this.loadCourses();
        this.IdCourseEdit = null;
        this.courseForm.reset();
        this.courseForm.markAsPristine();
        this.courseForm.markAsUntouched();
      });
    } else {
      const newCourse: Course = {
        id: this.generateSequentialId(),
        ...formValue
      };
      this.coursesService.addCourse(newCourse).subscribe(() => {
        this.loadCourses();
        this.courseForm.reset();
        this.courseForm.markAsPristine();
        this.courseForm.markAsUntouched();
      });
    }
  }

  onDelete(id: string): void {
    if (!this.isAdmin()) return;
    if (confirm("¿Seguro que deseas eliminar el curso?")) {
      this.coursesService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  onEdit(course: Course): void {
    if (!this.isAdmin()) return;
    this.IdCourseEdit = course.id;
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
    });
  }

  generateSequentialId(): string {
    const existingIds = this.coursesList
      .map(c => c.id)
      .filter(id => /^[a-z]+[0-9]+$/i.test(id));

    const getLastIdParts = (id: string) => {
      const match = id.match(/^([a-z]+)(\d+)$/i);
      if (!match) return { prefix: 'a', number: 0 };
      return {
        prefix: match[1],
        number: parseInt(match[2], 10)
      };
    };

    let maxPrefix = 'a';
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

    return 'a' + chars.join('');
  }

  isAdmin(): boolean {
    return this.auth.getRole() === 'admin';
  }
}
