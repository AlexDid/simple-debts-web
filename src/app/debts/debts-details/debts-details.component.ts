import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectDebtUpdatingStatus, selectSelectedDebt } from '../../store/debts/debts.selectors';
import { SubscriptionComponent } from '../../core/models';
import { Debt, DebtStatus } from '../../store/debts/models';
import { filter, map, tap } from 'rxjs/operators';
import { loadDebt } from '../../store/debts/debts.actions';

@Component({
  selector: 'app-debts-details',
  templateUrl: './debts-details.component.html',
  styleUrls: ['./debts-details.component.scss']
})
export class DebtsDetailsComponent extends SubscriptionComponent implements OnInit {

  debt: Debt;

  isUpdating = false;

  private loaded = false;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSelectedDebt();
    this.getUpdatingStatus();
  }

  get isDebtCreationStatus(): boolean {
    return !!this.debt && this.debt.status === DebtStatus.CREATION_AWAITING;
  }

  private getSelectedDebt(): void {
    this.store.pipe(
      select(selectSelectedDebt),
      filter(debt => !!debt),
      tap(debt => this.loadDebt(debt)),
      this.getTakeUntilPipe()
    ).subscribe(debt => this.debt = debt);
  }

  private loadDebt({id, moneyOperations}: Debt): void {
    if (!moneyOperations?.length && !this.loaded) {
      this.loaded = true;
      this.store.dispatch(loadDebt({id}));
    }
  }

  private getUpdatingStatus(): void {
    this.store.select(selectDebtUpdatingStatus).pipe(
      map(id => id === this.debt?.id),
      this.getTakeUntilPipe(),
    ).subscribe(updating => this.isUpdating = updating);
  }
}
