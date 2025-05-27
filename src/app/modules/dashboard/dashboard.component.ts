import { Component } from '@angular/core';
import { AuthService } from '../../../app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  constructor(private auth: AuthService) {}

  isAdmin(): boolean {
    return this.auth.getRole() === 'admin';
  }
}
