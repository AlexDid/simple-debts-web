import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Debt } from '../../store/debts/models';
import { SubscriptionComponent } from '../../core/models';
import { loadDebts } from '../../store/debts/debts.actions';
import { selectDebts } from '../../store/debts/debts.selectors';

@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.scss']
})
export class DebtsListComponent extends SubscriptionComponent implements OnInit, OnDestroy {

  debts$: Observable<Debt[]>;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDebts();
    this.fetchDebts();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private getDebts(): void {
    this.debts$ = this.store.pipe(
      select(selectDebts),
      this.getTakeUntilPipe()
    );
  }

  private fetchDebts(): void {
    this.store.dispatch(loadDebts());
  }

}
