import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'projects',
    canActivate: [AuthGuard],
    canMatch: [AuthGuard],
    loadChildren: () =>
      import('./features/projects/projects.module').then(m => m.ProjectsModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
  path: 'projects/:projectId/tasks',
  canActivate: [AuthGuard],
  canMatch: [AuthGuard],
  loadChildren: () =>
    import('./features/tasks/tasks.module').then(m => m.TasksModule),
},
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'projects' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
