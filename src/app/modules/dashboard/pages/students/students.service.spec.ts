import { TestBed } from '@angular/core/testing';
import { StudentsService, Student } from './students.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [StudentsService]
    });

    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('debería agregar un nuevo estudiante', () => {
    const newStudent: Student = {
      id: 'xyz789',
      name: 'Pedro',
      lastName: 'López',
      age: 23,
      email: 'pedro.lopez@mail.com',
      phone: 99999999
    };

    service.addStudent(newStudent).subscribe((student) => {
      expect(student).toEqual(newStudent);
    });

    const req = httpMock.expectOne('http://localhost:3000/students');
    expect(req.request.method).toBe('POST');
    req.flush(newStudent);
  });
});
