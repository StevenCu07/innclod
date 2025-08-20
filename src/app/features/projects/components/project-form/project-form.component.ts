import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { trimmedRequired, forbiddenWords, uniqueProjectTitle, minLenTrimmed } from '../../../../shared/validators';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnChanges {
  @Input() initial?: Project | Omit<Project, 'id'>;
  @Input() currentId?: number;
  @Output() submitForm = new EventEmitter<Omit<Project, 'id'>>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
       title: [
        '',
        [trimmedRequired, minLenTrimmed(3), forbiddenWords(['test','demo'])],
        [uniqueProjectTitle(this.projectsService, () => this.currentId)]
      ],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
    if (this.initial) this.form.patchValue(this.initial);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initial'] && this.form) {
      this.form.patchValue(this.initial ?? {});
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.value);
  }

  get f() { return this.form.controls; }
}
