import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectUserInfo } from '../../../../store';
import * as ControlsActions from '../../../../store/controls/controls.actions';
import * as DebtsActions from '../../../../store/debts/debts.actions';
import { Icons, SubscriptionComponent } from '../../../models';
import { AppWrapperConfig, RouterState } from '../../router';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { selectSelectedDebt } from '../../../../store/debts/debts.selectors';
import { Debt } from '../../../../store/debts/models';
import { selectHeaderTitle, selectRefreshControl } from '../../../../store/controls/controls.selectors';
import { ActionDto } from '../../../../store/controls/models';
import { selectMergedRoute } from '../../../../store/router/router.selectors';

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
  currentDebt: Debt;

  currentRoute: RouterState;

  isRefreshing = false;

  readonly backIcon = Icons.ARROW_BACK;
  readonly refreshIcon = Icons.REFRESH;


  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    super();
  }


  ngOnInit(): void {
    this.getHeaderUser();
    this.getRefreshingStatus();
    this.getCurrentUrl();
  }


  back(): void {
    const url = this.currentRoute.url.split('/');
    url.pop();
    this.router.navigate([url.join('/')]);
  }

  refresh(): void {
    if (!this.isRefreshing) {
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
  }

  private getHeaderUser(): void {
    combineLatest([
      this.store.select(selectUserInfo),
      this.store.select(selectSelectedDebt),
      this.store.select(selectHeaderTitle)
    ]).pipe(
      this.getTakeUntilPipe(),
    ).subscribe(([user, debt, title]) => {
      if (debt) {
        this.currentDebt = debt;
        this.picture = debt.user.picture;
        this.title = null;
      } else {
        this.currentDebt = null;
        this.picture = user?.picture;
        this.title = user?.name;
      }

      if (title) {
        this.title = title;
      }
    });
  }

  private getRefreshingStatus(): void {
    this.store.select(selectRefreshControl).pipe(
      this.getTakeUntilPipe()
    ).subscribe(isRefreshing => this.isRefreshing = isRefreshing);
  }

  private getCurrentUrl(): void {
    this.store.select(selectMergedRoute).pipe(
      this.getTakeUntilPipe()
    ).subscribe(route => this.currentRoute = route);
  }

}
