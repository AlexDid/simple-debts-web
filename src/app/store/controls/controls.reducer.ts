import { Action, createReducer, on } from '@ngrx/store';
import * as ControlsActions from './controls.actions';

export const controlsFeatureKey = 'controls';

export interface ControlsState {
  isRefreshing: boolean;
}

export const initialState: ControlsState = {
  isRefreshing: false
};

export const reducer = createReducer(
  initialState,

  on(ControlsActions.refresh, state => ({
    ...state,
    isRefreshing: true
  })),

  on(ControlsActions.refreshCompleted, state => ({
    ...state,
    isRefreshing: false
  })),
);

export function controlsReducer(state: ControlsState, action: Action): ControlsState {
  return reducer(state, action);
}
