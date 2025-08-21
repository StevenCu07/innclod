import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs/operators';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { NotifyService } from '../../../../shared/notify.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  error?: string;

  constructor(
    private projectsService: ProjectsService,
    private dialog: MatDialog,
    private notify: NotifyService,
  ) { }

  search = new FormControl<string>('', { nonNullable: true });
  sort: 'title' | 'id' = 'title';
  view: 'cards' | 'list' = 'cards';

  filtered: Project[] = [];

  ngOnInit(): void {
    this.fetchProjects();
    this.projectsService.getProjects().subscribe(list => {
      this.projects = list;
      this.applyFilters();
    });

    this.search.valueChanges.pipe(startWith(''), debounceTime(150)).subscribe(() => {
      this.applyFilters();
    });
  }

  setSort(s: 'title' | 'id') {
    this.sort = s;
    this.applyFilters();
  }

  setView(v: 'cards' | 'list') {
    this.view = v;
  }

  private applyFilters() {
    const q = this.search.value.trim().toLowerCase();
    let out = [...this.projects];
    if (q) {
      out = out.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q)
      );
    }
    out.sort((a, b) =>
      this.sort === 'title'
        ? a.title.localeCompare(b.title)
        : a.id - b.id
    );
    this.filtered = out;
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
        this.projectsService.deleteProject(id).subscribe({
          next: () => this.notify.success('Proyecto eliminado'),
          error: () => this.notify.error('No se pudo eliminar')
        });
      }
    });
  }
}
