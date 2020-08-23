import { Component, OnInit } from '@angular/core';
import { SubscriptionComponent, User } from '../../../core/models';
import { Store } from '@ngrx/store';
import { AppState, selectUserInfo } from '../../../store';
import {
  selectOperationAcceptStatus,
  selectOperationDeleteStatus,
  selectSelectedDebt,
  selectSelectedDebtId,
  selectSelectedOperation
} from '../../../store/debts/debts.selectors';
import { Debt, Operation, OperationStatus } from '../../../store/debts/models';
import { filter, first, tap } from 'rxjs/operators';
import { loadDebt } from '../../../store/debts/debts.actions';
import { combineLatest } from 'rxjs';
import { ListItemMessage, ListItemMessageColor } from '../../../shared/modules/list/list-item/models';

@Component({
  selector: 'app-operation-details',
  templateUrl: './operation-details.component.html',
  styleUrls: ['./operation-details.component.scss']
})
export class OperationDetailsComponent extends SubscriptionComponent implements OnInit {

  operation: Operation;

  debt: Debt;

  user: User;

  showSpinner = false;

  private loaded = false;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getOperation();
    this.getDebt();
    this.getCurrentUser();
    this.getSpinnerStatus();
  }

  get isCurrentUserTakesMoney(): boolean {
    return this.operation.moneyReceiver === this.user.id;
  }

  get fromUser(): string {
    return this.isCurrentUserTakesMoney ? this.user.name : this.debt.user.name;
  }

  get toUser(): string {
    return this.isCurrentUserTakesMoney ? this.debt.user.name : this.user.name;
  }

  get showOperation(): boolean {
    return !!this.debt && !!this.user && !!this.operation && !this.showSpinner;
  }

  get message(): ListItemMessage {
    switch (this.operation.status) {
      case OperationStatus.CANCELLED:
        const canceledBy = this.operation.cancelledBy === this.user.id ? 'you' : this.debt.user.name;
        return {
          text: `Operation was canceled by ${canceledBy}`,
          color: ListItemMessageColor.RED
        };
      case OperationStatus.CREATION_AWAITING:
        return {
          text: this.operation.statusAcceptor === this.user.id
            ? 'Use buttons on the right to accept or decline operation'
            : `Waiting for ${this.debt.user.name} to accept operation`,
          color: ListItemMessageColor.ACCENT
        };
      default:
        return null;
    }
  }

  private getOperation(): void {
    this.store.select(selectSelectedOperation).pipe(
      this.getTakeUntilPipe()
    ).subscribe(operation => this.operation = operation);
  }

  private getDebt(): void {
    this.store.select(selectSelectedDebt).pipe(
      tap(debt => this.loadDebt(debt)),
      this.getTakeUntilPipe()
    ).subscribe(debt => this.debt = debt);
  }

  private getCurrentUser(): void {
    this.store.select(selectUserInfo).pipe(
      this.getTakeUntilPipe()
    ).subscribe(user => this.user = user);
  }

  private loadDebt(debt: Debt): void {
    if (!debt || (!debt.moneyOperations?.length && !this.loaded)) {
      this.loaded = true;
      this.dispatchDebtLoad();
    }
  }

  private getSpinnerStatus(): void {
    combineLatest([
      this.store.select(selectOperationDeleteStatus),
      this.store.select(selectOperationAcceptStatus),
      this.store.select(selectSelectedOperation),
    ]).pipe(
      this.getTakeUntilPipe()
    ).subscribe(([deleting, accepting, operation]) => {
      this.showSpinner = deleting === operation?.id || accepting === operation?.id;
    });
  }

  private dispatchDebtLoad(): void {
    this.store.select(selectSelectedDebtId).pipe(
      filter(id => !!id),
      first()
    ).subscribe(id => this.store.dispatch(loadDebt({id})));
  }

}
