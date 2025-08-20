import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskCreateComponent } from './pages/task-create/task-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../shared/material.module';


@NgModule({
  declarations: [
    TasksListComponent,
    TaskEditComponent,
    TaskFormComponent,
    TaskCreateComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MaterialModule,
  ]
})
export class TasksModule { }
