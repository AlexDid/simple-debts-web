import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordConfirmationValidator } from '../helpers/password-confirmation.validator';
import { AuthForm } from '../../store/auth/models';
import { NestedFormDataDto, SubscriptionComponent } from '../../core/models';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent extends SubscriptionComponent implements OnInit, OnDestroy {

  @Input()
  set passwordConfirmation(value: boolean) {
    this.showPasswordConfirmation = value;
    this.togglePasswordConfirmation();
  }

  get passwordConfirmation(): boolean {
    return this.showPasswordConfirmation;
  }

  @Output()
  formChanges = new EventEmitter<NestedFormDataDto<AuthForm>>();

  form: FormGroup;

  private showPasswordConfirmation = false;

  constructor(
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.togglePasswordConfirmation();
    this.setupFormEmitter();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }


  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, passwordConfirmationValidator('password')]]
    });
  }

  private setupFormEmitter(): void {
    this.form
      .valueChanges
      .pipe(
        this.getTakeUntilPipe()
      )
      .subscribe(value => this.formChanges.emit({value, valid: this.form.valid}));
  }

  private togglePasswordConfirmation(): void {
    if (this.form) {
      const control = this.form.get('passwordConfirm');
      this.showPasswordConfirmation ? control.enable() : control.disable();
    }
  }
}
