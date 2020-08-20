import { Component } from '@angular/core';
import { NestedFormComponent } from '../../../core/models';
import { DebtTypeForm } from '../models';
import { Validators } from '@angular/forms';
import { DebtAccountType } from '../../../store/debts/models';

@Component({
  selector: 'app-debt-type-form',
  templateUrl: './debt-type-form.component.html',
  styleUrls: ['./debt-type-form.component.scss']
})
export class DebtTypeFormComponent extends NestedFormComponent<DebtTypeForm> {

  readonly DebtAccountType = DebtAccountType;

  get selectedType(): DebtAccountType {
    return this.form.get('type' as keyof DebtTypeForm).value;
  }

  selectType(type: DebtAccountType): void {
    this.form.patchValue({type} as DebtTypeForm);
  }

  // tslint:disable-next-line:no-any
  protected getFormGroup(): { [key in keyof DebtTypeForm]: any } {
    return {
      type: [null, Validators.required]
    };
  }

}
