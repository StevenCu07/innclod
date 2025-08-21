import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../../../../features/projects/models/task.model';
import { trimmedRequired, minLenTrimmed } from '../../../../shared/validators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() initial?: Task | Omit<Task, 'id'>;
  @Output() submitForm = new EventEmitter<Omit<Task, 'id'>>();
  form!: FormGroup;

  editMode = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [trimmedRequired, minLenTrimmed(3)]],
      completed: [false],
    });
    if (this.initial) {
      this.form.patchValue(this.initial);
      this.editMode = !!(this.initial as Task)?.id;
    }
  }

  ngOnChanges(): void {
    if (this.form && this.initial) {
      this.form.patchValue(this.initial);
    }
    this.editMode = !!(this.initial as Task)?.id;
  }

  private normalize(): void {
    const t = (this.f['title'].value ?? '').toString().trim().replace(/\s+/g, ' ');
    this.form.patchValue({ title: t }, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.normalize();
    this.submitForm.emit(this.form.value);
  }

  get f() { return this.form.controls; }
}
