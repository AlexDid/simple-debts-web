import { AuthUser, RefreshToken, Token } from './models';
import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { LocalStorageHelper } from '../../core/helpers/local-storage.helper';

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

  on(authActions.login, state => ({
    ...state,
    isLoading: true
  })),

  on(authActions.signUp, state => ({
    ...state,
    isLoading: true
  })),

  on(authActions.authFailed, state => ({
    ...state,
    isLoading: false
  })),

  on(authActions.authCompleted, (state, { user, token, refreshToken }) => {
    return {
      ...state,
      user,
      token,
      refreshToken,
      isLoading: false
    };
  }),

  on(authActions.logout, (_, {}) => {
    return emptyState;
  })
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducerInternal(state, action);
}
