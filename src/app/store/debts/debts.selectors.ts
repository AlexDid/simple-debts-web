import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDebts from './debts.reducer';
import { selectMergedRoute } from '../router/router.selectors';
import { plainToClass } from 'class-transformer';
import { Debt, Operation } from './models';
import { selectCurrenciesDictionary } from '../common/common.selectors';
import { Dictionary } from '@ngrx/entity';

export const debtIdRouteParam = 'debtId';
export const operationIdRouteParam = 'operationId';

export const selectDebtsState = createFeatureSelector<fromDebts.DebtsState>(
  fromDebts.debtsFeatureKey
);

export const selectDebtsLoadedStatus = createSelector(
  selectDebtsState,
  state => state.isLoaded
);

export const selectDebtSubmittingStatus = createSelector(
  selectDebtsState,
  state => state.isSubmittingNewDebt
);

export const selectDebtUpdatingStatus = createSelector(
  selectDebtsState,
  state => state.updatingDebt
);

export const selectDebtsEntities = createSelector(
  createSelector(
    selectDebtsState,
    fromDebts.adapter.getSelectors().selectEntities,
  ),
  selectCurrenciesDictionary,
  (debts, currencies) => {
    const copy = {...debts};
    Object.keys(copy).forEach(key => copy[key] = plainToClass(Debt, {
      ...copy[key],
      currency: currencies[copy[key].currency]?.symbol || copy[key].currency
    }));

    return copy as Dictionary<Debt>;
  }
);

export const selectDebts = createSelector(
  selectDebtsEntities,
  (debts) => Object.values(debts)
);

export const selectSelectedDebtId = createSelector(
  selectDebtsEntities,
  selectMergedRoute,
  (debts, router) => router?.params
    ? router.params[debtIdRouteParam]
    : null
);

export const selectSelectedDebt = createSelector(
  selectDebtsEntities,
  selectMergedRoute,
  (debts, router) => router?.params
    ? plainToClass(Debt, debts[router.params[debtIdRouteParam]]) as Debt
    : null
);

export const selectCreateOperationStatus = createSelector(
  selectDebtsState,
  state => state.creatingOperation
);

export const selectOperationAcceptStatus = createSelector(
  selectDebtsState,
  state => state.acceptingOperation
);

export const selectOperationDeleteStatus = createSelector(
  selectDebtsState,
  state => state.deletingOperation
);

export const selectSelectedOperation = createSelector(
  selectSelectedDebt,
  selectMergedRoute,
  (debt, router) => router?.params && debt?.moneyOperations
    ? plainToClass(Operation, debt.moneyOperations.find(op => op.id === router.params[operationIdRouteParam])) as Operation
    : null
);
