import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoleGuard } from '../../../app/core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'enrollments',
        pathMatch: 'full'
      },
      {
        path: 'students',
        canActivate: [RoleGuard(['admin'])],
        loadChildren: () =>
          import('./pages/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'courses',
        canActivate: [RoleGuard(['admin', 'user'])],
        loadChildren: () =>
          import('./pages/courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'enrollments',
        canActivate: [RoleGuard(['admin', 'user'])],
        loadChildren: () =>
          import('./pages/enrollments/enrollments.module').then(m => m.EnrollmentsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
