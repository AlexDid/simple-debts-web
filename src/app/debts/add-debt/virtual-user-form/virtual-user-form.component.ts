import { Component, OnInit } from '@angular/core';
import { NestedFormComponent } from '../../../core/models';
import { VirtualUserForm } from '../models';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-virtual-user-form',
  templateUrl: './virtual-user-form.component.html',
  styleUrls: ['./virtual-user-form.component.scss']
})
export class VirtualUserFormComponent extends NestedFormComponent<VirtualUserForm> implements OnInit {

// tslint:disable-next-line:no-any
  protected getFormGroup(): { [key in keyof VirtualUserForm]: any } {
    return {
      userName: ['', [Validators.required, Validators.minLength(3)]]
    };
  }

}
