import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import { MaterialModule } from '../../shared/material.module';


@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectFormComponent,
    ProjectCreateComponent,
    ConfirmDialogComponent,
    ProjectEditComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MaterialModule,
  ]
})
export class ProjectsModule { }
