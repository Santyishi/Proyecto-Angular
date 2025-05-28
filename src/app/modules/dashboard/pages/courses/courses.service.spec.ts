import { TestBed } from '@angular/core/testing';
import { CoursesService, Course } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener todos los cursos', () => {
    const dummyCourses: Course[] = [
      { id: 'a1', title: 'Angular Básico', description: 'Curso introductorio' },
      { id: 'a2', title: 'Angular Avanzado', description: 'Temas avanzados' }
    ];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(dummyCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });
});
