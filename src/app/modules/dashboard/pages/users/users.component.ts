import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../../core/services/auth.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: false
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  usersList: Usuario[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  editUserId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      role: ['user', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.usersList = users;
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value;

    if (this.editUserId) {
      const updated: Usuario = {
        id: this.editUserId,
        ...formValue
      };
      this.usersService.updateUser(updated).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    } else {
      const newUser: Usuario = {
        id: this.generateSequentialId(),
        ...formValue
      };
      this.usersService.addUser(newUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  onEdit(user: Usuario): void {
    this.editUserId = user.id;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role
    });
  }

  onDelete(id: string): void {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usersService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  resetForm(): void {
    this.userForm.reset({
      name: null,
      email: null,
      password: null,
      role: 'user'
    });
    this.editUserId = null;
  }

  generateSequentialId(): string {
    const numericIds = this.usersList
      .map(u => parseInt(u.id, 10))
      .filter(id => !isNaN(id));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    return (maxId + 1).toString();
  }
}
