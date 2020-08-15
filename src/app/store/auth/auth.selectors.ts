import { AuthState } from './auth.reducer';
import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

export const getAuthFeatureState = (state: AppState) => state.auth;

export const selectUserInfo = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.user
);

export const selectIsFormLoading = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.isLoading
);
