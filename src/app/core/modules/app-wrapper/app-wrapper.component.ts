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
import { selectSelectedDebt, selectSelectedOperation } from '../../../store/debts/debts.selectors';
import { Debt, DebtAccountType, Operation, OperationActionDto, OperationStatus } from '../../../store/debts/models';
import { toggleShowCanceledOperations } from '../../../store/controls/controls.actions';
import { selectShowCanceledOperations } from '../../../store/controls/controls.selectors';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent extends SubscriptionComponent implements OnInit {

  config: AppWrapperConfig = {};

  showAllOperations = true;

  readonly buttons = outsideButtonsMap;

  private selectedDebt: Debt;

  private selectedOperation: Operation;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDebtAndConfig();
    this.getShowSelectedOperations();
    this.getSelectedOperation();
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

  addOperation(): void {
    this.router.navigate([`${this.selectedDebt.id}/add-operation`]);
  }

  deleteDebt(): void {
    this.store.dispatch(DebtsActions.deleteDebtRequest({debt: this.selectedDebt}));
  }

  deleteOperation(): void {
    this.store.dispatch(DebtsActions.deleteOperationRequest(this.operationActionDto));
  }

  toggleShowCanceledOperations(): void {
    this.store.dispatch(toggleShowCanceledOperations());
  }

  acceptOperation(): void {
    this.store.dispatch(DebtsActions.acceptOperation(this.operationActionDto));
  }

  declineOperation(): void {
    this.store.dispatch(DebtsActions.declineOperation(this.operationActionDto));
  }

  private getDebtAndConfig(): void {
    combineLatest([
      this.getSelectedDebt(),
      this.getRouteData(),
      this.getSelectedOperation()
    ]).pipe(
      this.getTakeUntilPipe()
    ).subscribe(([debt, config, operation]) => {
      this.selectedDebt = debt;
      this.selectedOperation = operation;
      this.config = {
        ...config,
        showAllOperations: false,
        deleteOperation: false,
        acceptOperation: false,
        declineOperation: false
      } || {};

      if (debt?.moneyOperations?.some(op => op.status !== OperationStatus.UNCHANGED) && config?.showAllOperations) {
        this.config = {
          ...this.config,
          showAllOperations: true
        };
      }

      if (config?.deleteOperation && debt?.type === DebtAccountType.SINGLE_USER) {
        this.config = {
          ...this.config,
          deleteOperation: true
        };
      }

      if (config?.acceptOperation && config?.declineOperation &&
        debt?.type === DebtAccountType.MULTIPLE_USERS &&
        operation?.status === OperationStatus.CREATION_AWAITING &&
        operation?.statusAcceptor !== debt?.user?.id
      ) {
        this.config = {
          ...this.config,
          acceptOperation: true,
          declineOperation: true
        };
      }
    });
  }

  private getRouteData(): Observable<AppWrapperConfig> {
    return this.store.select(selectRouteData);
  }

  private getSelectedDebt(): Observable<Debt> {
    return this.store.select(selectSelectedDebt);
  }

  private getShowSelectedOperations(): void {
    this.store.select(selectShowCanceledOperations).pipe(
      this.getTakeUntilPipe()
    ).subscribe(show => this.showAllOperations = show);
  }

  private getSelectedOperation(): Observable<Operation> {
    return this.store.select(selectSelectedOperation);
  }

  private get operationActionDto(): OperationActionDto {
    return {
      debtsId: this.selectedDebt.id,
      id: this.selectedOperation.id
    };
  }
}
