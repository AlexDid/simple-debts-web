import { Component, Input } from '@angular/core';
import { AddDebtForm } from '../models';
import { DebtAccountType } from '../../../store/debts/models';

@Component({
  selector: 'app-confirm-screen',
  templateUrl: './confirm-screen.component.html',
  styleUrls: ['./confirm-screen.component.scss']
})
export class ConfirmScreenComponent {

  @Input()
  form: AddDebtForm;

  get isSingleUserDebt(): boolean {
    return this.form.type === DebtAccountType.SINGLE_USER;
  }
}
