import { Component, Input } from '@angular/core';
import { Operation, OperationStatus } from '../../../../store/debts/models';
import { MoneyStatusColor } from '../../../models';
import { ListItemMessage, ListItemMessageColor } from '../../../../shared/modules/list/list-item/models';
import { moneyStatusColorsMap } from '../../../data';
import { Icons } from '../../../../core/models';

@Component({
  selector: 'app-operation-list-item',
  templateUrl: './operation-list-item.component.html',
  styleUrls: ['./operation-list-item.component.scss']
})
export class OperationListItemComponent {

  @Input()
  operation: Operation;

  @Input()
  userId: string;

  readonly icon = Icons.ARROW_BACK;

  private readonly moneyStatusColorsMap = moneyStatusColorsMap;

  get summaryColor(): MoneyStatusColor {
    return this.moneyStatusColorsMap.get(this.operation.getMoneyStatus(this.userId));
  }

  get picture(): string {
    return '';
  }

  get message(): ListItemMessage {
    switch (this.operation.status) {
      case OperationStatus.CANCELLED:
        return {
          text: 'CANCELED',
          color: ListItemMessageColor.RED
        };
      default:
        return null;
    }
  }
}
