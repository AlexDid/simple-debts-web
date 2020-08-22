import { Component, Input } from '@angular/core';
import { Debt, DebtStatus } from '../../../store/debts/models';
import { moneyStatusColorsMap } from '../../data';
import { MoneyStatusColor } from '../../models';
import { ListItemMessage, ListItemMessageColor } from '../../../shared/modules/list/list-item/models';

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

  get message(): ListItemMessage[] {
    switch (this.debt.status) {
      case DebtStatus.CREATION_AWAITING || DebtStatus.CONNECT_USER:
        return [{
          text: this.debt.isUserStatusAcceptor ? 'NEW' : 'WAITING',
          color: ListItemMessageColor.ACCENT
        }];
      case DebtStatus.USER_DELETED:
        return [{
          text: 'USER LEFT',
          color: ListItemMessageColor.RED
        }];
      case DebtStatus.CHANGE_AWAITING:
        return this.debt.isUserStatusAcceptor ? [{
          text: 'NEW OPERATIONS',
          color: ListItemMessageColor.ACCENT
        }] : [];
      default:
        return [];
    }
  }

}
