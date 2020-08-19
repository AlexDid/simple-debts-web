import { createFeatureSelector, createSelector } from '@ngrx/store';
import { controlsFeatureKey, ControlsState } from './controls.reducer';

export const selectControls = createFeatureSelector<ControlsState>(controlsFeatureKey);

export const selectRefreshControl = createSelector(
  selectControls,
  state => state.isRefreshing
);
