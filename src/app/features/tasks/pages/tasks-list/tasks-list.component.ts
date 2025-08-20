import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../../projects/services/tasks.service';
import { Task } from '../../../projects/models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = Number(params.get('projectId'));
      if (projectId) {
        this.fetchTasks(projectId);
      }
    });
  }

private fetchTasks(projectId: number): void {
    this.loading = true;
    this.error = undefined;

    this.tasksService.getTasksByProject(projectId).subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar las tareas.';
        this.loading = false;
      }
    });
  }
}
