import { authReducer, AuthEffects, AuthState } from './auth';
import { Action } from '@ngrx/store';

export * from './auth';

type FeatureState = AuthState;

export interface AppState {
  auth: AuthState;
}

export const appReducer = Object.fromEntries(new Map<keyof AppState, (feature: FeatureState, action: Action) => FeatureState>([
  ['auth', authReducer]
]));

export const appEffects = [AuthEffects];
