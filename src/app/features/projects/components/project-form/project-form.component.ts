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

  constructor(private fb: FormBuilder, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        '',
        [trimmedRequired, minLenTrimmed(3), forbiddenWords(['test', 'demo'])],
        [uniqueProjectTitle(this.projectsService, () => this.currentId)]
      ],
      description: ['', [trimmedRequired, minLenTrimmed(5)]],
    });
    if (this.initial) this.form.patchValue(this.initial);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form) return;
    if (changes['initial'] && this.initial) {
      this.form.patchValue(this.initial);
    }
    if (changes['currentId']) {
      this.form.get('title')?.updateValueAndValidity({ onlySelf: true });
    }
  }

  get f() { return this.form.controls; }

  private normalize() {
    const t = (this.f['title'].value ?? '').toString().trim();
    const d = (this.f['description'].value ?? '').toString().trim();
    const titleCased = t
      .replace(/\s+/g, ' ')
      .replace(/\b\p{L}/gu, (m: string) => m.toUpperCase()); // <- tip del callback

    this.form.patchValue({ title: titleCased, description: d }, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }
    this.normalize();
    this.submitForm.emit(this.form.getRawValue());
  }
}

