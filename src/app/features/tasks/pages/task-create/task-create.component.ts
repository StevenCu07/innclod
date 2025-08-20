import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../projects/services/tasks.service';
import { Task } from '../../../projects/models/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  constructor(
    private tasks: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit(data: Omit<Task, 'id'>) {
    const projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.tasks.createTask(data, projectId).subscribe(() => {
      this.router.navigate(['/projects', projectId, 'tasks']);
    });
  }
}
