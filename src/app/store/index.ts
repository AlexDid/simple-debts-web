import { AuthEffects, authFeatureKey, authReducer, AuthState } from './auth';
import { Action } from '@ngrx/store';
import { debtsFeatureKey, debtsReducer, DebtsState } from './debts/debts.reducer';
import { DebtsEffects } from './debts/debts.effects';
import { routerFeatureKey } from './router/router.selectors';
import { routerReducer } from '@ngrx/router-store';
import { MergedRouteReducerState } from '../core/modules/router';
import { commonFeatureKey, commonReducer, CommonState } from './common/common.reducer';
import { CommonEffects } from './common/common.effects';
import { controlsFeatureKey, controlsReducer, ControlsState } from './controls/controls.reducer';
import { ControlsEffects } from './controls/controls.effects';

export * from './auth';

type Reducer<T> = (feature: T, action: Action) => T;
type FeatureStates = AuthState | DebtsState | MergedRouteReducerState | CommonState | ControlsState;

export interface AppState {
  [authFeatureKey]: AuthState;
  [debtsFeatureKey]: DebtsState;
  [routerFeatureKey]: MergedRouteReducerState;
  [commonFeatureKey]: CommonState;
  [controlsFeatureKey]: ControlsState;
}

export const appReducer: {[K in keyof AppState]: Reducer<Extract<FeatureStates, AppState[K]>>} = {
  [authFeatureKey]: authReducer,
  [debtsFeatureKey]: debtsReducer,
  [routerFeatureKey]: routerReducer,
  [commonFeatureKey]: commonReducer,
  [controlsFeatureKey]: controlsReducer
};

export const appEffects = [AuthEffects, DebtsEffects, CommonEffects, ControlsEffects];
