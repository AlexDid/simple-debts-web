import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordConfirmationValidator } from '../helpers/password-confirmation.validator';
import { AuthForm } from '../../store/auth/models';
import { NestedFormDataDto } from '../../core/models/nested-form-data.dto';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.togglePasswordConfirmation();
    this.setupFormEmitter();
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
      .subscribe(value => this.formChanges.emit({value, valid: this.form.valid}));
  }

  private togglePasswordConfirmation(): void {
    if (this.form) {
      const control = this.form.get('passwordConfirm');
      this.showPasswordConfirmation ? control.enable() : control.disable();
    }
  }
}
