import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  error?: string;

  constructor(private projectsService: ProjectsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchProjects();
    this.projectsService.getProjects().subscribe(list => this.projects = list);
  }

  private fetchProjects(): void {
    this.loading = true;
    this.error = undefined;
    this.projectsService.getProjects().subscribe({
      next: () => { this.loading = false; },
      error: (err) => { console.error(err); this.error = 'No se pudieron cargar los proyectos.'; this.loading = false; }
    });
  }

  confirmDelete(id: number): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar proyecto',
        message: 'Esta acción no se puede deshacer. ¿Deseas eliminarlo?',
        acceptLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
      }
    });

    ref.afterClosed().subscribe(ok => {
      if (ok) {
        this.projectsService.deleteProject(id).subscribe();
      }
    });
  }
}
