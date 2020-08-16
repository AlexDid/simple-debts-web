import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    switchMap(({email, password}) => this.authService.login(email, password).pipe(
      map((authData) => AuthActions.authCompleted(authData)),
      catchError((error) => of(AuthActions.authFailed(error)))
    )),
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(AuthActions.signUp),
    switchMap(({email, password}) => this.authService.signUp(email, password).pipe(
      map(authData => AuthActions.authCompleted(authData)),
      catchError(error => of(AuthActions.authFailed(error)))
    ))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.authService.logout())
  );

  @Effect()
  authError$ = this.actions$.pipe(
    ofType(AuthActions.authFailed),
    tap((error) => this.snackbar.open(error.error, null, {duration: 3000}))
  );
}
