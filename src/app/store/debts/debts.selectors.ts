import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDebts from './debts.reducer';
import { selectMergedRoute } from '../router/router.selectors';
import { plainToClass } from 'class-transformer';
import { Debt } from './models';

export const debtIdRouteParam = 'debtId';

export const selectDebtsState = createFeatureSelector<fromDebts.DebtsState>(
  fromDebts.debtsFeatureKey
);

export const selectDebts = createSelector(
  createSelector(
    selectDebtsState,
    fromDebts.adapter.getSelectors().selectAll,
  ),
  (debts) => plainToClass(Debt, debts)
);

export const selectSelectedDebt = createSelector(
  selectDebtsState,
  selectMergedRoute,
  ({entities}, {params}) => params ? plainToClass(Debt, entities[params[debtIdRouteParam]]) : null
);
