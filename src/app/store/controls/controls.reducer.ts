import { Action, createReducer, on } from '@ngrx/store';
import * as ControlsActions from './controls.actions';
import { HeaderTextDto } from './models';

export const controlsFeatureKey = 'controls';

export interface ControlsState extends HeaderTextDto {
  isRefreshing: boolean;
  showAllOperations: boolean;
}

export const initialState: ControlsState = {
  isRefreshing: false,
  headerText: '',
  showAllOperations: true
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

  on(ControlsActions.setHeaderText, (state, {headerText}) => ({
    ...state,
    headerText
  })),

  on(ControlsActions.resetHeaderText, state => ({
    ...state,
    headerText: ''
  })),

  on(ControlsActions.toggleShowCanceledOperations, state => ({
    ...state,
    showAllOperations: !state.showAllOperations
  })),
);

export function controlsReducer(state: ControlsState, action: Action): ControlsState {
  return reducer(state, action);
}
