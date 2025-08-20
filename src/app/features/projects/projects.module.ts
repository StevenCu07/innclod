import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';


@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectFormComponent,
    ProjectCreateComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProjectsModule { }
