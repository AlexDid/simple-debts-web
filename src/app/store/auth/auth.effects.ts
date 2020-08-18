import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarHelper } from '../../core/helpers';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap(({email, password}) => this.authService.login(email, password).pipe(
      map((authData) => AuthActions.authCompleted(authData)),
      catchError((error) => of(AuthActions.authFailed(error)))
    )),
  );

  @Effect()
  facebookLogin$ = this.actions$.pipe(
    ofType(AuthActions.facebookLogin),
    mergeMap(() => this.authService.facebookLoginAttempt().pipe(
      map(user => AuthActions.facebookLoginCompleted(user)),
      catchError((error) => of(AuthActions.authFailed(error)))
    )),
  );

  @Effect()
  facebookLoginCompleted$ = this.actions$.pipe(
    ofType(AuthActions.facebookLoginCompleted),
    mergeMap(user => this.authService.loginWithFbToken(user).pipe(
      map(authData => AuthActions.authCompleted(authData)),
      catchError((error) => of(AuthActions.authFailed(error)))
    )),
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(AuthActions.signUp),
    mergeMap(({email, password}) => this.authService.signUp(email, password).pipe(
      map(authData => AuthActions.authCompleted(authData)),
      catchError(error => of(AuthActions.authFailed(error)))
    ))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.authService.logout())
  );

  @Effect({ dispatch: false })
  authError$ = this.actions$.pipe(
    ofType(AuthActions.authFailed),
    tap(({error}) => ErrorSnackbarHelper.showErrorSnackbar(this.snackbar, error))
  );
}
