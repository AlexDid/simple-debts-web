import { authReducer, AuthEffects, AuthState, authFeatureKey } from './auth';
import { Action } from '@ngrx/store';

export * from './auth';

type FeatureState = AuthState;

export interface AppState {
  [authFeatureKey]: AuthState;
}

export const appReducer = Object.fromEntries(new Map<keyof AppState, (feature: FeatureState, action: Action) => FeatureState>([
  [authFeatureKey, authReducer]
]));

export const appEffects = [AuthEffects];
