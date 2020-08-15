import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as authActions from './auth.actions';
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
    ofType(authActions.login),
    switchMap(({email, password}) => this.authService.login(email, password).pipe(
      map((authData) => authActions.authCompleted(authData)),
      catchError((error) => of(authActions.authFailed(error)))
    )),
  );

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(authActions.signUp),
    switchMap(({email, password}) => this.authService.signUp(email, password).pipe(
      map(authData => authActions.authCompleted(authData)),
      catchError(error => of(authActions.authFailed(error)))
    ))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(authActions.logout),
    tap(() => this.authService.logout())
  );

  @Effect({ dispatch: false })
  authError$ = this.actions$.pipe(
    ofType(authActions.authFailed),
    map((error) => this.snackbar.open(error.error, null, {duration: 3000}))
  );
}
