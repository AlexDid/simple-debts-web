import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CommonService } from '../../core/services/common.service';
import * as CommonActions from './common.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CommonEffects {

  constructor(
    private actions$: Actions,
    private commonService: CommonService,
    private snackbar: MatSnackBar
  ) {}

  @Effect()
  loadCurrencies$ = this.actions$.pipe(
    ofType(CommonActions.loadCurrencies),
    switchMap(() => this.commonService.getCurrencies().pipe(
      map(currencies => CommonActions.loadCurrenciesSuccess({currencies})),
      catchError(error => of(CommonActions.loadCurrenciesError(error)))
    )),
  );

  @Effect()
  showError$ = this.actions$.pipe(
    ofType(CommonActions.loadCurrenciesError),
    tap((error) => this.snackbar.open(error.error, null, {duration: 3000}))
  );

}
