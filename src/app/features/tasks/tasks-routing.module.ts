import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { TaskCreateComponent } from './pages/task-create/task-create.component';

const routes: Routes = [
  { path: '', component: TasksListComponent },
  { path: 'create', component: TaskCreateComponent },
  { path: ':taskId/edit', component: TaskEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
