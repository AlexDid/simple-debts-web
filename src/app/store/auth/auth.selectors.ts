import { authFeatureKey, AuthState } from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getAuthFeatureState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUserInfo = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.user
);

export const selectIsFormLoading = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.isLoading
);
