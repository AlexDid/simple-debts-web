import { Component } from '@angular/core';
import { NestedFormComponent } from '../../../core/models';
import { SelectUserForm } from '../models';
import { Validators } from '@angular/forms';
import { UserSearchForm } from '../../../shared/modules/user-search/models';

@Component({
  selector: 'app-select-user-form',
  templateUrl: './select-user-form.component.html',
  styleUrls: ['./select-user-form.component.scss']
})
export class SelectUserFormComponent extends NestedFormComponent<SelectUserForm> {

  updateForm(searchForm: UserSearchForm): void {
    this.form.patchValue(searchForm);
  }

  // tslint:disable-next-line:no-any
  protected getFormGroup(): { [key in keyof SelectUserForm]: any } {
    return {
      userId: ['', Validators.required],
      selectedUser: [null, Validators.required]
    };
  }

}
