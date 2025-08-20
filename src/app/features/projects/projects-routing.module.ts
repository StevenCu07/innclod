import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';

const routes: Routes = [
   {path: '', component: ProjectsListComponent },
   { path: 'create', component: ProjectCreateComponent },
   { path: ':id/edit', component: ProjectEditComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
