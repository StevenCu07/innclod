import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';


@NgModule({
  declarations: [
    TasksListComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
  ]
})
export class TasksModule { }
