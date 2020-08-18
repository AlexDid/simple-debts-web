import { createAction, props } from '@ngrx/store';
import { AuthForm, FullAuthData } from './models';
import { ErrorDto } from '../../core/models';
import { SocialUser } from 'angularx-social-login';

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
export const facebookLoginCompleted = createAction(
  '[Auth] Facebook Login Completed',
  props<SocialUser>()
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
