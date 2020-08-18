import { createFeatureSelector, createSelector } from '@ngrx/store';
import { commonFeatureKey, CommonState } from './common.reducer';

export const selectCommonState = createFeatureSelector<CommonState>(commonFeatureKey);

export const selectCurrencies = createSelector(
  selectCommonState,
  state => state.currencies
);
