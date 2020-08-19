import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Debt } from '../../store/debts/models';
import { SubscriptionComponent } from '../../core/models';
import { selectDebts, selectDebtsLoadedStatus } from '../../store/debts/debts.selectors';

@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.scss']
})
export class DebtsListComponent extends SubscriptionComponent implements OnInit {

  debts$: Observable<Debt[]>;

  isLoaded = false;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getLoadedStatus();
    this.getDebts();
  }

  private getDebts(): void {
    this.debts$ = this.store.pipe(
      select(selectDebts),
      this.getTakeUntilPipe()
    );
  }

  private getLoadedStatus(): void {
    this.store.select(selectDebtsLoadedStatus).pipe(
      this.getTakeUntilPipe()
    ).subscribe(isLoaded => this.isLoaded = isLoaded);
  }

}
