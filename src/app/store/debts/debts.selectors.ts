import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDebts from './debts.reducer';
import { selectMergedRoute } from '../router/router.selectors';
import { debtIdRouteParam } from '../../debts/debts-routing.module';

export const selectDebtsState = createFeatureSelector<fromDebts.State>(
  fromDebts.debtsFeatureKey
);

export const selectDebts = createSelector(
  selectDebtsState,
  state => state.entities
);

export const selectSelectedDebt = createSelector(
  selectDebtsState,
  selectMergedRoute,
  (state, route) => state.entities[route.params[debtIdRouteParam]]
);
