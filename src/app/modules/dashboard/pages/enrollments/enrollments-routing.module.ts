import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './enrollments.component';

const routes: Routes = [
  {
    path: '',
    component: EnrollmentsComponent,
    data: { title: 'Gestión de Inscripciones' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule {}
