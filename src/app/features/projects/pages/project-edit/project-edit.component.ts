import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  initial?: Project;

  constructor(
    private route: ActivatedRoute,
    private projects: ProjectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projects.getProjectById(id).subscribe(p => this.initial = p);
  }

  onSubmit(data: Omit<Project, 'id'>) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projects.updateProject(id, data).subscribe(() => {
      this.router.navigateByUrl('/projects');
    });
  }
}
