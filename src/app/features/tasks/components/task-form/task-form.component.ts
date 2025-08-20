import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from '../../../projects/models/task.model';
import { trimmedRequired } from '../../../../shared/validators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() initial?: Task | Omit<Task, 'id'>;
  @Output() submitForm = new EventEmitter<Omit<Task, 'id'>>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [trimmedRequired, Validators.minLength(3)]],
      completed: [false],
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
