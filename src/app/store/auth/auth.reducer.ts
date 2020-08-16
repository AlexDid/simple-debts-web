import { AuthUser, RefreshToken, Token } from './models';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { LocalStorageHelper } from '../../core/helpers/local-storage.helper';

export const authFeatureKey = 'auth';

export interface AuthState extends AuthUser, Token, RefreshToken {
  isLoading: boolean;
}

const emptyState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false
};

export const initialAuthState: AuthState = Object.assign({}, emptyState, LocalStorageHelper.getLoggedUser());

const authReducerInternal = createReducer(
  initialAuthState,

  on(AuthActions.login, state => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.signUp, state => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.authFailed, state => ({
    ...state,
    isLoading: false
  })),

  on(AuthActions.authCompleted, (state, { user, token, refreshToken }) => {
    return {
      ...state,
      user,
      token,
      refreshToken,
      isLoading: false
    };
  }),

  on(AuthActions.logout, (_, {}) => {
    return emptyState;
  })
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducerInternal(state, action);
}
