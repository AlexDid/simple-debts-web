import { createAction, props } from '@ngrx/store';
import { AuthForm, FullAuthData } from './models';
import { ErrorObject } from '../../core/models/error.interface';

export const login = createAction(
  '[Auth] Login',
  props<AuthForm>()
);
export const signUp = createAction(
  '[Auth] Sign Up',
  props<AuthForm>()
);
export const facebookLogin = createAction(
  '[Auth] Facebook Login'
);

export const authCompleted = createAction(
  '[Auth] Auth Completed',
  props<FullAuthData>()
);
export const authFailed = createAction(
  '[Auth] Auth Failed',
  props<ErrorObject>()
);

export const logout = createAction('[Auth] Logout');
