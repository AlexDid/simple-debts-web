import { createFeatureSelector, createSelector } from '@ngrx/store';
import { commonFeatureKey, CommonState, adapter } from './common.reducer';

export const selectCommonState = createFeatureSelector<CommonState>(commonFeatureKey);

export const selectCurrenciesDictionary = createSelector(
  selectCommonState,
  state => adapter.getSelectors().selectEntities(state.currencies)
);

export const selectCurrencyISOs = createSelector(
  selectCommonState,
  state => adapter.getSelectors().selectIds(state.currencies)
);
