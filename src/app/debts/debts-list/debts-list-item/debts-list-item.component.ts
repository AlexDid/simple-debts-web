import { Component, Input } from '@angular/core';
import { Debt, DebtStatus } from '../../../store/debts/models';
import { moneyStatusColorsMap } from '../../data';
import { MoneyStatusColor } from '../../models';

@Component({
  selector: 'app-debts-list-item',
  templateUrl: './debts-list-item.component.html',
  styleUrls: ['./debts-list-item.component.scss']
})
export class DebtsListItemComponent {

  @Input()
  debt: Debt;

  private readonly moneyStatusColorsMap = moneyStatusColorsMap;

  get summaryColor(): MoneyStatusColor {
    return this.moneyStatusColorsMap.get(this.debt.moneyStatus);
  }

  get message(): string {
    switch (this.debt.status) {
      case DebtStatus.CREATION_AWAITING || DebtStatus.CONNECT_USER:
        return this.debt.isUserStatusAcceptor ? 'NEW' : 'WAITING';
      case DebtStatus.USER_DELETED:
        return 'USER LEFT';
      case DebtStatus.CHANGE_AWAITING:
        return this.debt.isUserStatusAcceptor ? 'NEW OPERATIONS' : null;
      default:
        return null;
    }
  }

}
