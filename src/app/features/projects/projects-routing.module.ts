import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';

const routes: Routes = [
   {path: '', component: ProjectsListComponent },
   { path: 'create', component: ProjectCreateComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
