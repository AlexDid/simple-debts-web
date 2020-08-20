import { Component, Input } from '@angular/core';
import { Debt, MoneyStatus } from '../../../../../store/debts/models';
import { moneyStatusColorsMap } from '../../../../../debts/data';
import { MoneyStatusColor } from '../../../../../debts/models';

@Component({
  selector: 'app-debt-title',
  templateUrl: './debt-title.component.html',
  styleUrls: ['./debt-title.component.scss']
})
export class DebtTitleComponent {

  @Input()
  debt: Debt;

  readonly moneyStatusColorsMap = moneyStatusColorsMap;

  get summaryColor(): MoneyStatusColor {
    return this.moneyStatusColorsMap.get(this.debt.moneyStatus);
  }

  get summary(): string {
    switch (this.debt.moneyStatus) {
      case MoneyStatus.NONE: return null;
      case MoneyStatus.GIVEN: return `+${this.debt.currency}${this.debt.summary}`;
      case MoneyStatus.TAKEN: return `-${this.debt.currency}${this.debt.summary}`;
    }
  }

  get summaryTooltip(): string {
    switch (this.debt.moneyStatus) {
      case MoneyStatus.NONE: return `${this.debt.user.name} owes you nothing`;
      case MoneyStatus.TAKEN: return `You owe ${this.debt.user.name} ${this.debt.currency}${this.debt.summary}`;
      case MoneyStatus.GIVEN: return `${this.debt.user.name} owes you ${this.debt.currency}${this.debt.summary}`;
    }
  }

}
