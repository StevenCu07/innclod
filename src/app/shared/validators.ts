import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { ProjectsService } from '../features/projects/services/projects.service';

export const trimmedRequired: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = (c.value ?? '').toString().trim();
  return v.length ? null : { trimmedRequired: true };
};

export const minLenTrimmed = (n: number): ValidatorFn => {
  return (c: AbstractControl): ValidationErrors | null => {
    const v = (c.value ?? '').toString().trim();
    return v.length >= n ? null : { minlengthTrimmed: { requiredLength: n, actualLength: v.length } };
  };
};

export const forbiddenWords = (words: string[]): ValidatorFn => {
  const set = new Set(words.map(w => w.toLowerCase()));
  return (c: AbstractControl): ValidationErrors | null => {
    const v = (c.value ?? '').toString().toLowerCase().trim();
    return set.has(v) ? { forbidden: true } : null;
  };
};

export const uniqueProjectTitle = (
  projectsService: ProjectsService,
  getCurrentId: () => number | undefined
): AsyncValidatorFn => {
  return (control: AbstractControl) => {
    const raw = (control.value ?? '').toString();
    const value = raw.trim().toLowerCase();

    if (value.length < 3) {
      return Promise.resolve(null);
    }

    return projectsService.getProjects().pipe(
      take(1),
      map(list => {
        const currentId = getCurrentId();
        const exists = list.some(p => p.title.trim().toLowerCase() === value && p.id !== currentId);
        return exists ? { notUnique: true } : null;
      })
    );
  };
};
