import { Component, Input, OnInit } from '@angular/core';
import { Operation, OperationStatus } from '../../../../store/debts/models';
import { MoneyStatusColor } from '../../../models';
import { ListItemMessage, ListItemMessageColor } from '../../../../shared/modules/list/list-item/models';
import { moneyStatusColorsMap } from '../../../data';
import { Icons, SubscriptionComponent } from '../../../../core/models';
import { acceptOperation, declineOperation } from '../../../../store/debts/debts.actions';
import { selectOperationAcceptStatus } from '../../../../store/debts/debts.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store';

@Component({
  selector: 'app-operation-list-item',
  templateUrl: './operation-list-item.component.html',
  styleUrls: ['./operation-list-item.component.scss']
})
export class OperationListItemComponent extends SubscriptionComponent implements OnInit {

  @Input()
  operation: Operation;

  @Input()
  userId: string;

  @Input()
  debtId: string;

  showSpinner = false;

  readonly icon = Icons.ARROW_BACK;

  private readonly moneyStatusColorsMap = moneyStatusColorsMap;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSpinnerStatus();
  }

  get summaryColor(): MoneyStatusColor {
    return this.moneyStatusColorsMap.get(this.operation.getMoneyStatus(this.userId));
  }

  get picture(): string {
    return '';
  }

  get isUnaccepted(): boolean {
    return this.operation.status !== OperationStatus.UNCHANGED;
  }

  get messages(): ListItemMessage[] {
    switch (this.operation.status) {
      case OperationStatus.CANCELLED:
        return [{
          text: 'CANCELED',
          color: ListItemMessageColor.RED
        }];
      case OperationStatus.CREATION_AWAITING:
        return this.operation.statusAcceptor === this.userId
          ? [{
            text: 'WAITING',
            color: ListItemMessageColor.ACCENT
          }]
          : [{
            text: 'ACCEPT',
            color: ListItemMessageColor.ACCENT,
            action: acceptOperation({ id: this.operation.id, debtsId: this.debtId })
          }, {
            text: 'DECLINE',
            color: ListItemMessageColor.RED,
            action: declineOperation({ id: this.operation.id, debtsId: this.debtId })
          }];
      default:
        return null;
    }
  }

  private getSpinnerStatus(): void {
    this.store.select(selectOperationAcceptStatus).pipe(
      this.getTakeUntilPipe()
    ).subscribe(id => this.showSpinner = id === this.operation.id);
  }
}
