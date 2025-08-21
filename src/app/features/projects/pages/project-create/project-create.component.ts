import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';
import { NotifyService } from '../../../../shared/notify.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  constructor(
    private projects: ProjectsService, 
    private router: Router, 
    private notify: NotifyService
  ) { }

  onSubmit(data: Omit<Project, 'id'>) {
    this.projects.createProject(data).subscribe({
      next: () => { this.notify.success('Proyecto creado'); this.router.navigateByUrl('/projects'); },
      error: () => this.notify.error('No se pudo crear el proyecto')
    });
  }
}
