import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { selectRouteData } from '../../../store/router/router.selectors';
import { AppWrapperConfig } from '../router';
import { SubscriptionComponent } from '../../models';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as DebtsActions from '../../../store/debts/debts.actions';
import { outsideButtonsMap } from './data';
import { OutsideButton } from './models';
import { Router } from '@angular/router';
import { selectSelectedDebt } from '../../../store/debts/debts.selectors';
import { Debt } from '../../../store/debts/models';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent extends SubscriptionComponent implements OnInit {

  config: AppWrapperConfig = {};

  readonly buttons = outsideButtonsMap;

  private selectedDebt: Debt;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRouteData();
    this.getSelectedDebt();
  }

  getButton(name: keyof AppWrapperConfig): OutsideButton {
    return this.config[name]
      ? this.buttons.get(name)
      : null;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  addDebt(): void {
    this.router.navigate(['add-debt']);
  }

  deleteDebt(): void {
    this.store.dispatch(DebtsActions.deleteDebtRequest({debt: this.selectedDebt}));
  }

  private getRouteData(): void {
    this.store.select(selectRouteData).pipe(
      this.getTakeUntilPipe()
    ).subscribe(data => this.config = data || {});
  }

  private getSelectedDebt(): void {
    this.store.select(selectSelectedDebt).pipe(
      this.getTakeUntilPipe()
    ).subscribe(debt => this.selectedDebt = debt);
  }
}
