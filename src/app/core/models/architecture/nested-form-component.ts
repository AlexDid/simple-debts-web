import { SubscriptionComponent } from './subscription-component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NestedFormDataDto } from '..';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export abstract class NestedFormComponent<T> extends SubscriptionComponent implements OnInit {

  @Input()
  formValue: T;

  @Output()
  formChanges = new EventEmitter<NestedFormDataDto<T>>();

  form: FormGroup;

  constructor(
    protected fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.setFormValue();
    this.setupFormEmitter();
  }

  // tslint:disable-next-line:no-any
  protected abstract getFormGroup(): { [key in keyof T]: any };

  protected getFormValueToPatch(): T {
    return this.formValue;
  }

  protected emitFormValue(value: T): void {
    this.formChanges.emit({value, valid: this.form.valid});
  }

  private buildForm(): void {
    this.form = this.fb.group(this.getFormGroup());
  }

  private setFormValue(): void {
    if (this.formValue) {
      this.form.patchValue(this.getFormValueToPatch());
    }
  }

  private setupFormEmitter(): void {
    this.emitFormValue(this.form.value);
    this.form
      .valueChanges
      .pipe(
        this.getTakeUntilPipe()
      )
      .subscribe(value => this.emitFormValue(value));
  }
}
