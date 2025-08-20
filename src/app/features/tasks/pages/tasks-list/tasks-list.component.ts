import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../../projects/services/tasks.service';
import { Task } from '../../../projects/models/task.model';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../../projects/components/confirm-dialog/confirm-dialog.component';
import { ProjectsService } from '../../../projects/services/projects.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error?: string;
  private projectId!: number;

  projectTitle = '';

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private dialog: MatDialog,
    private projectsService: ProjectsService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('projectId'));
      if (this.projectId) {
        this.projectsService.getProjectById(this.projectId).subscribe(p => {
          this.projectTitle = p?.title ?? `Proyecto #${this.projectId}`;
        });
        this.fetchTasks(this.projectId);
      }
    });
  }

  private fetchTasks(projectId: number): void {
    this.loading = true;
    this.error = undefined;

    this.tasksService.getTasksByProject(projectId).subscribe({
      next: (data) => { this.tasks = data; this.loading = false; },
      error: (err) => { console.error(err); this.error = 'No se pudieron cargar las tareas.'; this.loading = false; }
    });
  }

  confirmDelete(id: number): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar tarea',
        message: 'Esta acción no se puede deshacer. ¿Deseas eliminarla?',
        acceptLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
      }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        this.tasksService.deleteTask(id).subscribe(() => {
          this.fetchTasks(this.projectId);
        });
      }
    });
  }

toggleComplete(t: Task, event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  this.tasksService.updateTask(t.id, {
    title: t.title,
    completed: checked,
    projectId: t.projectId,
  }).subscribe(() => this.fetchTasks(this.projectId));
}

}
