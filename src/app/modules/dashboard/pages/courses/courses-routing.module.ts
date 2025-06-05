import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    data: { title: 'Gestión de Cursos' }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
