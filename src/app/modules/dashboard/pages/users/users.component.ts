import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './users.model';
import { UsersService } from './users.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: false
})
export class UsersComponent implements OnInit {
  usersList: User[] = [];
  userForm: FormGroup;
  editingUserId: string | null = null;
  displayedColumns = ['id', 'name', 'email', 'role', 'actions'];

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      address: [null],
      phone: [null],
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
    if (this.userForm.invalid) return;

    const user: User = {
      id: this.editingUserId ?? '',
      ...this.userForm.value
    };

    if (this.editingUserId) {
      this.usersService.updateUser(user).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    } else {
      this.usersService.addUser(user).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  onEdit(user: User): void {
    this.editingUserId = user.id;
    this.userForm.patchValue(user);
  }

  onDelete(id: string): void {
    if (confirm('¿Eliminar este usuario?')) {
      this.usersService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  resetForm(): void {
    this.editingUserId = null;
    this.userForm.reset({ role: 'user' });
  }
}
