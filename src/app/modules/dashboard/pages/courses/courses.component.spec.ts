import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { AuthService } from '../../../../core/services/auth.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let mockCoursesService: jasmine.SpyObj<CoursesService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockCoursesService = jasmine.createSpyObj('CoursesService', ['getCourses']);
    mockCoursesService.getCourses.and.returnValue(of([])); // Fix para evitar el error de subscribe

    mockAuthService = jasmine.createSpyObj('AuthService', ['getRole']);
    mockAuthService.getRole.and.returnValue('admin');

    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los cursos al iniciar', () => {
    const mockCourses = [
      { id: 'a1', title: 'Curso 1', description: 'Descripción 1' }
    ];

    mockCoursesService.getCourses.and.returnValue(of(mockCourses));

    component.loadCourses();

    expect(component.coursesList).toEqual(mockCourses);
  });
});
