import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  error?: string;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  private fetchProjects(): void {
    this.loading = true;
    this.error = undefined;

    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los proyectos.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
