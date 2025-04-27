import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Student } from './models/index';
import { generateRandomString } from '../../../../Shared/utils';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  standalone: false,
  
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  
  studentForm : FormGroup;
  displayedColumns: string[] = ['id', 'name', 'lastName','age','email','phone', 'actions'];
  studentsList : Student[] = [{
    id:generateRandomString(5),
    name:"Tobias",
    lastName:"Gonzalez",
    age:22,
    email:"tobigon@gmail.com",
    phone:1230032,
    
  }];

  IdStudentEdit?:string | null = null

  constructor(private fb: FormBuilder, private matDialog : MatDialog){
    this.studentForm = this.fb.group({
      name:[null,Validators.required],
      lastName : [null, Validators.required],
      age:[null,Validators.required],
      email:[null,Validators.required],
      phone:[null,Validators.required],
    });
  }


  onSubmit(){
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{

      if(!!this.IdStudentEdit){

      this.studentsList = this.studentsList.map((student) => 
      student.id === this.IdStudentEdit ?
         ({...student, ...this.studentForm.value})
         :student)
         this.IdStudentEdit = null;

      }else{
        this.studentsList = [
          ...this.studentsList,
          {
            id: generateRandomString(6),
          ...this.studentForm.value,
          }
        ]
      }


      this.studentForm.reset();
    }
  }

  onDelete( id:string ) { 
    if(confirm("Seguro que deseas eliminar el estudiante?")){
       this.studentsList = this.studentsList.filter((el)=> el.id != id)
    }
   }

   onEdit(student:Student):void {
    this.IdStudentEdit = student.id;
    this.studentForm.patchValue({
      name:student.name,
      lastName:student.lastName,
      age:student.age,
      phone:student.phone,
      email:student.email,
    
    })
   }

}