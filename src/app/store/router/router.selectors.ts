import {createFeatureSelector, createSelector} from '@ngrx/store';
import { MergedRouteReducerState, routerStateConfig } from '../../core/modules/router';

export const selectRouterReducerState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);

export const selectMergedRoute = createSelector(
  selectRouterReducerState,
  (routerReducerState) => routerReducerState.state
);
