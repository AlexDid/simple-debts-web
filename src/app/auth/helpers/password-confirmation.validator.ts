import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordConfirmationValidator(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.parent?.get(passwordControlName)?.value;
    if (!password) {
      return null;
    }

    if (control.value !== password) {
      return { passwordConfirmation: true };
    }

    return null;
  };
}
