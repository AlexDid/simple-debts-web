import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDebts from './debts.reducer';
import { selectMergedRoute } from '../router/router.selectors';
import { plainToClass } from 'class-transformer';
import { Debt } from './models';
import { selectCurrenciesDictionary } from '../common/common.selectors';
import { Dictionary } from '@ngrx/entity';

export const debtIdRouteParam = 'debtId';

export const selectDebtsState = createFeatureSelector<fromDebts.DebtsState>(
  fromDebts.debtsFeatureKey
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

export const selectSelectedDebt = createSelector(
  selectDebtsEntities,
  selectMergedRoute,
  (debts, {params}) => params ? plainToClass(Debt, debts[params[debtIdRouteParam]]) as Debt : null
);
