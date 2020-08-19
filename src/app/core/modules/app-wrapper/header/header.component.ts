import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUserInfo } from '../../../../store';
import * as AuthActions from '../../../../store/auth/auth.actions';
import * as ControlsActions from '../../../../store/controls/controls.actions';
import * as DebtsActions from '../../../../store/debts/debts.actions';
import { Icons, SubscriptionComponent } from '../../../models';
import { AppWrapperConfig } from '../../router';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { selectSelectedDebt } from '../../../../store/debts/debts.selectors';
import { Debt, MoneyStatus } from '../../../../store/debts/models';
import { selectRefreshControl } from '../../../../store/controls/controls.selectors';
import { ActionDto } from '../../../../store/controls/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends SubscriptionComponent implements OnInit {

  @Input()
  config: AppWrapperConfig;

  picture: string;
  title: string;

  isRefreshing = false;

  readonly backIcon = Icons.ARROW_BACK;
  readonly refreshIcon = Icons.REFRESH;

  private currentDebt: Debt;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    super();
  }


  ngOnInit(): void {
    this.getHeaderUser();
    this.getRefreshingStatus();
  }


  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  back(): void {
    this.router.navigate(['../']);
  }

  refresh(): void {
    let actionDto: ActionDto;
    if (this.currentDebt) {
      actionDto = {
        action: DebtsActions.loadDebt({id: this.currentDebt.id}),
        completeAction: DebtsActions.loadDebtSuccess,
        errorAction: DebtsActions.loadDebtError
      };
    } else {
      actionDto = {
        action: DebtsActions.loadDebts(),
        completeAction: DebtsActions.loadDebtsSuccess,
        errorAction: DebtsActions.loadDebtsError
      };
    }
    this.store.dispatch(ControlsActions.refresh(actionDto));
  }

  private getHeaderUser(): void {
    combineLatest([
      this.store.select(selectUserInfo),
      this.store.select(selectSelectedDebt)
    ]).pipe(
      this.getTakeUntilPipe(),
    ).subscribe(([user, debt]) => {
      if (debt) {
        this.currentDebt = debt;
        this.picture = debt.user.picture;
        this.title = this.getDebtTitle();
      } else {
        this.currentDebt = null;
        this.picture = user.picture;
        this.title = user.name;
      }
    });
  }

  private getDebtTitle(): string {
    const debt = this.currentDebt;
    switch (debt.moneyStatus) {
      case MoneyStatus.NONE: return `${debt.user.name} owes you nothing`;
      case MoneyStatus.GIVEN: return `You owe ${debt.user.name} ${debt.currency}${debt.summary}`;
      case MoneyStatus.TAKEN: return `${debt.user.name} owes you ${debt.currency}${debt.summary}`;
    }
  }

  private getRefreshingStatus(): void {
    this.store.select(selectRefreshControl).pipe(
      this.getTakeUntilPipe()
    ).subscribe(isRefreshing => this.isRefreshing = isRefreshing);
  }

}
