import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, commonFeatureKey, CommonState } from './common.reducer';

export const selectCommonState = createFeatureSelector<CommonState>(commonFeatureKey);

export const selectCurrenciesDictionary = createSelector(
  selectCommonState,
  state => adapter.getSelectors().selectEntities(state.currencies)
);

export const selectCurrencyISOs = createSelector(
  selectCommonState,
  state => adapter.getSelectors().selectIds(state.currencies) as string[]
);
