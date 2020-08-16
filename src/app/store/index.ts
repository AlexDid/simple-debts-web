import { authReducer, AuthEffects, AuthState, authFeatureKey } from './auth';
import { Action } from '@ngrx/store';
import { debtsFeatureKey, debtsReducer, DebtsState } from './debts/debts.reducer';
import { DebtsEffects } from './debts/debts.effects';
import { routerFeatureKey } from './router/router.selectors';
import { routerReducer } from '@ngrx/router-store';
import { MergedRouteReducerState } from '../core/modules/router';

export * from './auth';

type Reducer<T> = (feature: T, action: Action) => T;
type FeatureStates = AuthState | DebtsState | MergedRouteReducerState;

export interface AppState {
  [authFeatureKey]: AuthState;
  [debtsFeatureKey]: DebtsState;
  [routerFeatureKey]: MergedRouteReducerState;
}

export const appReducer: {[K in keyof AppState]: Reducer<Extract<FeatureStates, AppState[K]>>} = {
  [authFeatureKey]: authReducer,
  [debtsFeatureKey]: debtsReducer,
  [routerFeatureKey]: routerReducer
};

export const appEffects = [AuthEffects, DebtsEffects];
