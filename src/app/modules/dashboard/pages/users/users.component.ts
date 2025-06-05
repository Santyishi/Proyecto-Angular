import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone:false,
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
  }

  deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe(() => {
      this.users$ = this.usersService.getUsers(); // recargar
    });
  }
}
