import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDebts from './debts.reducer';
import { selectMergedRoute } from '../router/router.selectors';
import { plainToClass } from 'class-transformer';
import { Debt } from './models';
import { selectCurrenciesDictionary } from '../common/common.selectors';

export const debtIdRouteParam = 'debtId';

export const selectDebtsState = createFeatureSelector<fromDebts.DebtsState>(
  fromDebts.debtsFeatureKey
);

export const selectDebts = createSelector(
  createSelector(
    selectDebtsState,
    fromDebts.adapter.getSelectors().selectAll,
  ),
  selectCurrenciesDictionary,
  (debts, currencies) => {
    const updatedDebts = debts.map(debt => ({
      ...debt,
      currency: currencies[debt.currency]?.symbol || debt.currency
    }));

    return plainToClass(Debt, updatedDebts);
  }
);

export const selectSelectedDebt = createSelector(
  selectDebtsState,
  selectMergedRoute,
  ({entities}, {params}) => params ? plainToClass(Debt, entities[params[debtIdRouteParam]]) : null
);
