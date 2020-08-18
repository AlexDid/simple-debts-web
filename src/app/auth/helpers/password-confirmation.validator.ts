import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordConfirmationValidator<T>(passwordControlName: keyof T): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.parent?.get(passwordControlName as string)?.value;
    if (!password) {
      return null;
    }

    if (control.value !== password) {
      return { passwordConfirmation: true };
    }

    return null;
  };
}
