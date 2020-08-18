import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { passwordConfirmationValidator } from '../helpers/password-confirmation.validator';
import { AuthForm } from '../../store/auth/models';
import { NestedFormComponent } from '../../core/models';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent extends NestedFormComponent<AuthForm> implements OnInit {

  @Input()
  set passwordConfirmation(value: boolean) {
    this.showPasswordConfirmation = value;
    this.togglePasswordConfirmation();
  }

  get passwordConfirmation(): boolean {
    return this.showPasswordConfirmation;
  }

  private showPasswordConfirmation = false;

  ngOnInit(): void {
    super.ngOnInit();
    this.togglePasswordConfirmation();
  }

  // tslint:disable-next-line:no-any
  protected getFormGroup(): { [key in keyof AuthForm]: any } {
    return {
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', passwordConfirmationValidator<AuthForm>('password')]
    };
  }

  private togglePasswordConfirmation(): void {
    if (this.form) {
      const control = this.form.get('passwordConfirm' as keyof AuthForm);
      this.showPasswordConfirmation ? control.enable() : control.disable();
    }
  }
}
