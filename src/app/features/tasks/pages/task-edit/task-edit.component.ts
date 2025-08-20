import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../projects/services/tasks.service';
import { Task } from '../../../projects/models/task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  initial?: Task;

  constructor(
    private route: ActivatedRoute,
    private tasks: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('taskId'));
    this.tasks.tasks$.subscribe(list => {
      this.initial = list.find(t => t.id === id);
    });
  }

  onSubmit(data: Omit<Task, 'id'>) {
    const id = Number(this.route.snapshot.paramMap.get('taskId'));
    const projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.tasks.updateTask(id, { ...data, projectId }).subscribe(() => {
      this.router.navigate(['/projects', projectId, 'tasks']);
    });
  }
}
