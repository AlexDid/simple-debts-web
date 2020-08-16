import {createFeatureSelector, createSelector} from '@ngrx/store';
import { MergedRouteReducerState } from '../../core/modules/router';

export const routerFeatureKey = 'router';

export const selectRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerFeatureKey);

export const selectMergedRoute = createSelector(
  selectRouterReducerState,
  (routerReducerState) => routerReducerState.state
);
