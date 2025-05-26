import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminGuard } from '../../../app/core/guards/admin.guard'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'enrollments', // ✅ Ahora apunta a una ruta accesible para ambos perfiles
        pathMatch: 'full'
      },
      {
        path: 'students',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./pages/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'courses',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./pages/courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'enrollments',
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
