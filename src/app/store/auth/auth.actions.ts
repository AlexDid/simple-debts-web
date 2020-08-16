import { createAction, props } from '@ngrx/store';
import { AuthForm, FullAuthData } from './models';
import { ErrorDto } from '../../core/models';

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
  props<ErrorDto>()
);

export const logout = createAction('[Auth] Logout');
