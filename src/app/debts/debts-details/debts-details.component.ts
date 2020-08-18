import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectSelectedDebt } from '../../store/debts/debts.selectors';
import { SubscriptionComponent } from '../../core/models';
import { Debt } from '../../store/debts/models';
import { filter, tap } from 'rxjs/operators';
import { loadDebt } from '../../store/debts/debts.actions';

@Component({
  selector: 'app-debts-details',
  templateUrl: './debts-details.component.html',
  styleUrls: ['./debts-details.component.scss']
})
export class DebtsDetailsComponent extends SubscriptionComponent implements OnInit, OnDestroy {

  debt: Debt;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSelectedDebt();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
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
    if (!moneyOperations?.length) {
      this.store.dispatch(loadDebt({id}));
    }
  }
}
