import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  constructor(private projects: ProjectsService, private router: Router) {}

  onSubmit(data: Omit<Project, 'id'>) {
    this.projects.createProject(data).subscribe(() => {
      this.router.navigateByUrl('/projects');
    });
  }
}
